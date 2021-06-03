//
//  File.swift
//  inputMasking
//
//  Created by Macbook on 01/04/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit
import AVFoundation



  extension UIColor {
      func HexToColor(hexString: String, alpha:CGFloat? = 1.0) -> UIColor {
          // Convert hex string to an integer
        let hexint = Int(self.intFromHexString(hexStr: hexString))
          let red = CGFloat((hexint & 0xff0000) >> 16) / 255.0
          let green = CGFloat((hexint & 0xff00) >> 8) / 255.0
          let blue = CGFloat((hexint & 0xff) >> 0) / 255.0
          let alpha = alpha!
          // Create color object, specifying alpha as well
          let color = UIColor(red: red, green: green, blue: blue, alpha: alpha)
          return color
      }
    
    func intFromHexString(hexStr: String) -> UInt32 {
         var hexInt: UInt32 = 0
         // Create scanner
      let scanner: Scanner = Scanner(string: hexStr)
         // Tell scanner to skip the # character
      scanner.charactersToBeSkipped = NSCharacterSet(charactersIn: "#") as CharacterSet
         // Scan hex value
      scanner.scanHexInt32(&hexInt)
         return hexInt
     }
  }

class MaskedInput : UITextField,  UITextFieldDelegate  {
  
  
  
  
  
  let someFrame = CGRect(x: 0.0, y: 0.0, width: 100.0, height: 30.0)
  
  @objc var disabled : Bool = false;
  @objc var numericErrorText : String = "Digit required";
  @objc var alphaErrorText : String = "Aplhabet required";
  @objc var maskFormat = "DD/DD/DD";
  private var maskIdentifier : String = "/";
  private var isMasking : Bool = false
  @objc var value: String = ""
  @objc var textSize: CGFloat = 15
  @objc var _textColor: String = "#000000"
  @objc var _placeholder: String = "Type something"
  @objc var textAlign: String = "left"
  @objc var _keyboardType: String = "default"
  @objc var _returnKeyType: String = "done"
  @objc var placeholderTextColor: String = "#cccccc"
  @objc var onChangeText:RCTDirectEventBlock?
  @objc var onFocusText:RCTDirectEventBlock?
  @objc var onErrorForMasking:RCTDirectEventBlock?
  @objc var onSubmitText:RCTDirectEventBlock?
  @objc var fontType: String = "PB"

  

  private var textField : UITextField = UITextField.init(frame: CGRect(x: 0, y: 0, width:0, height: 0))
  
//  private var initialIndex : String.Index = "teeam".firstIndex(of: "a")!;
  private var initialIndexOfSeperator : Int = 3;
  private var lastIndexOfSeperator : Int = 6;


  private var preText : String = "";
    private var separator : String = "";
    private var type : String = "";
  
//  private var thisView : UIView
  override init(frame: CGRect) {
    super.init(frame: frame)
    initilaizeView()
  }
  
  func identifySeperator(){
    for each in maskFormat {
        
      
        if(each == "+" )
        {
           
            
          self.maskIdentifier = "-"
          if(self.text?.count == 1){
            self.type = "phone"
            print("Type of masking: Phone number masking ",self.text!, each)
            var check = false
            var phoneStr = ""
            
            for phoneChar in maskFormat {
                
                if( phoneChar != "+" && phoneChar.isNumber && check == false ){
                    
                    phoneStr += String(phoneChar)
                }
                else if(phoneChar != "+" && phoneChar.isNumber == false
                    && phoneChar.isLetter == false && check == false){
                    
                     phoneStr += String(phoneChar)
                    check = true
                }
            }
            preText = "+"+phoneStr+self.text!
            self.text! = preText
          }
          
          return
        }
        if(each == "/"){
          print("Type of masking: Date masking")
           self.maskIdentifier = "/"
          preText = "";
          return
        }
        if(each == "-"){
          print("Type of masking: Credit card masking")
          self.maskIdentifier = "-"
          return
        }
      
      if(each == "A"){
        print("Type of masking: Id card  masking")
        return
      }
      
      print("None of the above identifiers")
      
    }
    
  }
  
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  func textFieldDidBeginEditing(_ textField: UITextField) {
    print("Editing began")
    onFocusText!(["text":"Focused"])
    isMasking = true;
  }
  
  func textFieldDidEndEditing(_ textField: UITextField) {
    prepareMask()
    onSubmitText!(["text":self.text!])
    print("Editing ended")
  }
  
  
  func textFieldShouldReturn(_ textField: UITextField) -> Bool {
    self.resignFirstResponder()
    return true
  }
  
    
  
  
  private func intializeEditingEvents(){
    self.addTarget(self, action: #selector(toggleEditing), for: UIControl.Event.editingDidBegin)
    self.addTarget(self, action: #selector(onTouchInside), for: .touchUpInside)
    self.addTarget(self, action: #selector(onTouchOutside), for: .touchUpOutside)
  }
  
  @objc func onTouchInside(textField: UITextField) {
   //Show AlertView
     print("Touch up inside, start editingk")
   }
  
  @objc func onTouchOutside(textField: UITextField) {
    //Show AlertView
      print("Touch up outside, suspend editing")
    }
  
 
  
  private func initilaizeView(){
    self.frame = self.bounds
    intializeEditingEvents()
    self.text = value
    // for testing purposes adding background color
    self.adjustsFontSizeToFitWidth = true;
    self.font = UIFont.systemFont(ofSize: textSize)
//    self.autoresizingMask = [.flexibleWidth, .flexibleHeight]
//    self.placeholder = "Enter text here"
    // self.becomeFirstResponder()
    self.autocorrectionType = UITextAutocorrectionType.no
    self.keyboardType = UIKeyboardType.default
    self.returnKeyType = UIReturnKeyType.done
//    self.clearButtonMode = UITextField.ViewMode.whileEditing
    self.contentVerticalAlignment = UIControl.ContentVerticalAlignment.center
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(didRecognizeTapGesture(_:)))
    self.addGestureRecognizer(tapGesture)
    self.borderStyle = .none;
    self.addTarget(self, action:  #selector(toggleEditing), for: .editingChanged)
    textField.delegate = self
    self.sizeToFit()
    self.translatesAutoresizingMaskIntoConstraints = true
  
  }
  
  var toggleCount: Int = 0
  
  
  
  func validateCharacter(_char: Character) -> Bool{
     var isValidated = false;
       if(_char == "-" || _char == "(" || _char == ")" || _char == "#" || _char == "@"){
         isValidated =  true
       }
     if(_char == "+" || _char == "*" || _char == "|" || _char == " "){
       isValidated =  true
     }
     if(_char == "/"){
       isValidated =  true
     }

           if(_char.isLetter && _char.isLowercase){
             isValidated =  true

           }
           if(_char.isNumber){
           isValidated =  true

           }



//     if(!isValidated){
//       onErrorForMasking!(["error":"Unknown masking identifier"])
//     }
   

     return isValidated
   }
   
   
  @objc func focus() {
//     self.textField.becomeFirstResponder()
    
    self.becomeFirstResponder()
     print("Became first responder by js ref focus")
   }
    
    
    @objc func blur() {
        self.resignFirstResponder()
        print("resign first responder by js ref blur")
      }
    
   
   @objc func update(value: NSNumber) {
      print("Getting ref value count from js: ", value)
    }
  
  
  

  
  
   private func prepareMask(){

    if(self.text!.count <= 2){
          self.separator = ""
    }
  
        var newStr = ""
        let test = self.text;
 
    print("new ",test!)
    
    for (index,each) in test!.enumerated() {
          if(self.text!.count >= 1){
           
            let test_char = maskFormat[maskFormat.index(maskFormat.startIndex, offsetBy: index)]
            print("Last item is : ",each , test_char ,self.separator, index)
 
           if( validateCharacter(_char: test_char)){
         
               let charIdentifier = test_char

               newStr += String(charIdentifier)
            
            if(self.type == "phone"){
                 
                  print("check here ",test_char,each)
                
                  if(self.separator == String(test_char) && String(each) != String(test_char)){
                                newStr += String(each)
                           }
                  else if(self.separator != String(test_char) && String(each) != String(test_char)){
                    newStr += String(each)
                }

                              self.text = newStr
                              self.separator = String(charIdentifier)
                
            }
            
            else{
                  
                if(self.separator == ""){
                                newStr += String(each)
                           }
                           else if(self.separator == String(test_char) && String(each) != String(test_char)){
                                newStr += String(each)
                           }
                             
                              self.text = newStr
                              self.separator = String(charIdentifier)
                                 
                              
                          }
                
            }
            
           
            
            
          if(test_char == "A" && each.isLetter){
            newStr += String(each)
            self.text = newStr
          
          } else if(test_char == "A" && !each.isLetter){
            onErrorForMasking!(["error":alphaErrorText])

            }
            
          if(test_char == "D" && each.isNumber){
            newStr += String(each)
            self.text = newStr
//            print("prev d ",self.text!,each,test_char,self.separator)
          }else if(test_char == "D" && !each.isNumber){
            onErrorForMasking!(["error":numericErrorText])
          }
            
            
          }else{
            print("Looping seamlessly,", index)
          
          }
        }
        
    }
    
    
    
  
   
  
  @objc private func toggleEditing(){
    if(self.text!.count > maskFormat.count){
      self.deleteBackward()
    }
    else{
    print("Toggled editing from js to native")
    identifySeperator()
    prepareMask()
    }
    onChangeText!(["text":self.text!])
    

  }
  
  
  
  @objc private dynamic func didRecognizeTapGesture(_ gesture: UITapGestureRecognizer) {
      let point = gesture.location(in: gesture.view)



      guard gesture.state == .ended, self.frame.contains(point) else { return }

    print("Tap gesture detected on self")

    self.becomeFirstResponder()

    self.addTarget(self, action:  #selector(toggleEditing), for: .allEditingEvents)
    
    //doSomething()
  }
  
  
  
  func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
    return true
  }
  
  
  

  
  func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
      // return NO to disallow editing.
      print("TextField should begin editing method called")
      return true
  }
  
  private func textFieldDidBeginEditing(textField: UITextField) -> Bool {
      if textField == textField {
        print(" In true Touched....")

          return true // myTextField was touched
      }
    print("Touched....")
    return true
  }
  
  
  
  
  override func didSetProps(_ changedProps: [String]!) {
    
    setProps(propsArray: changedProps)
    
    print("Did set prop", changedProps ?? "not changed")
    
  }
  
  private func setTextAlignment() -> NSTextAlignment {
    switch textAlign {
    case "center":
      return NSTextAlignment.center
    case "left":
      return NSTextAlignment.left
   case "right":
      return NSTextAlignment.right
   case "justified":
      return NSTextAlignment.justified
    default:
     return NSTextAlignment.natural

    }
  }
  
  
  
  private func setKeyboardType() -> UIKeyboardType {
    
    switch _keyboardType {
    case "email-address":
      return UIKeyboardType.emailAddress
    case "number-pad":
      return UIKeyboardType.numberPad
    case "decimal-pad":
      return UIKeyboardType.decimalPad
    case "alphabet":
      return UIKeyboardType.alphabet
    case "date-time":
      return UIKeyboardType.phonePad
    case "phone-pad":
      return UIKeyboardType.phonePad
    default:
      return UIKeyboardType.default

    }
    
  }
  
  private func setReturnKeyType() -> UIReturnKeyType {
    
    switch _returnKeyType {
    case "go":
      return  UIReturnKeyType.go
    case "next":
       return  UIReturnKeyType.next
    case "search":
       return  UIReturnKeyType.search
    case "done":
      return  UIReturnKeyType.done
    case "google":
      return  UIReturnKeyType.google
    case "continue":
      return  UIReturnKeyType.continue
    case "emergency":
      return  UIReturnKeyType.emergencyCall
    case "send":
      return  UIReturnKeyType.send
    default:
      return UIReturnKeyType.done

    }
    
  }
  
  
  private func setFontType() -> UIFont {
    for family in UIFont.familyNames.sorted() {
        let names = UIFont.fontNames(forFamilyName: family)
        print("Family: \(family) Font names: \(names)")
    }
    
    guard let customFont = UIFont(name: fontType, size: textSize) else{
      onErrorForMasking!(["error":"Failed to Load the font provided"])
      print("Failed to find font provided")
      return UIFont(name: "AmericanTypewriter-CondensedBold", size: textSize)!;
    }
    return customFont
    

  }
  
  
  private func setProps(propsArray:[String]!){
    
  
    for prop in propsArray{
      if(prop != "onChangeText"){
        switch prop {
        case "textSize":
           self.font = UIFont.systemFont(ofSize: textSize)
          print("One prop at a time", prop)
        case "_placeholder":
           self.placeholder = _placeholder
          print("One prop at a time", prop)
         print("One prop at a time", prop)
        case "disabled":
          self.isEnabled = disabled;
          print("One prop at a time", prop)
        case "value":
          self.text = value
          print("One prop at a time", prop)
        case "_keyboardType":
          self.keyboardType = setKeyboardType()
          print("One prop at a time", prop)
        case "textAlign":
          self.textAlignment = setTextAlignment()
          print("One prop at a time", prop)
        case "_returnKeyType":
          self.returnKeyType = setReturnKeyType()
          print("One prop at a time", prop)
        case "_textColor":
          let color = UIColor().HexToColor(hexString: _textColor, alpha: 1.0)
          self.textColor = color
          print("One prop at a time", prop)
        case "fontType":
          self.textField.font = setFontType()
          print("One prop at a time", prop)
        case "placeholderTextColor":
          let color = UIColor().HexToColor(hexString: placeholderTextColor, alpha: 1.0)
          self.attributedPlaceholder = NSAttributedString(string: "placeholderTextColor",
                                                              attributes: [NSAttributedString.Key.foregroundColor: color])

        default:
        print("One prop at a time..")

        }
        
      }else{
        print("Toggle text found")
      }
      
    }
    
  }

  
  
}



@objc (InputMasking)
class InputMasking: RCTViewManager {
  override class func requiresMainQueueSetup() -> Bool {
    return true;
  }
  

  
  override func view() -> UIView! {
//    var View  = SimpleInput()
    return MaskedInput()
  }
  
  
  @objc  func focus(_ node:NSNumber) {
      DispatchQueue.main.async {
        let nativeComponent = self.bridge.uiManager.view(forReactTag: node) as! MaskedInput
        nativeComponent.focus()
      }
    }
    
    @objc  func blur(_ node:NSNumber) {
         DispatchQueue.main.async {
           let nativeComponent = self.bridge.uiManager.view(forReactTag: node) as! MaskedInput
           nativeComponent.blur()
         }
       }
    
   
    
    @objc func updateFromManager(_ node: NSNumber, count: NSNumber) {
       
       DispatchQueue.main.async {                                // 2
         let nativeComponent = self.bridge.uiManager.view(             // 3
           forReactTag: node                                     // 4
         ) as! MaskedInput                                       // 5
         nativeComponent.update(value: count)                          // 6
       }
     }
}


