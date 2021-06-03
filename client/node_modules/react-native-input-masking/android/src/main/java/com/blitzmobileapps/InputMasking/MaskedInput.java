package com.blitzmobileapps.InputMasking;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.Editable;
import android.text.InputFilter;
import android.text.InputType;
import android.text.Selection;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextWatcher;
import android.text.method.PasswordTransformationMethod;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.TextView;

import androidx.core.view.ViewCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.textinput.ReactEditText;

public class MaskedInput extends androidx.appcompat.widget.AppCompatEditText {

    private SpannableString spannable;
    private RelativeSizeSpan span;
    public String maskType = "", maskFormat = "";
    private char maskDigit = 'D', maskAlphabet = 'A';
    private int startIndex ;
    private Boolean shouldCallMaskingMethod = false ;
    private int lengthOfInput = 0 ;

    private String[] errorMessages = new String[]{
            "Only digits are allowed at this position",
            "Only alphabets are allowed at this position",
            "Please enter mask format"
    };

    public MaskedInput(Context context) {
        super(context);
        spannable  = new SpannableString("");
        span = new RelativeSizeSpan(1.0f);

        ColorStateList colorStateList = ColorStateList.valueOf(Color.TRANSPARENT);
        ViewCompat.setBackgroundTintList(this,colorStateList);

        this.setPlaceHolderColor(Color.LTGRAY);

        this.setGravity(Gravity.BOTTOM);

        this.setSingleLine();

        this.changeTextListener();

        this.onSubmitPressed();

        this.onFocus();

    }





//    ******************* Class Level private methods ********************


    private void onFocus(){
       final EditText editText = this;

        this.setOnFocusChangeListener(new OnFocusChangeListener() {
            @Override
            public void onFocusChange(View view, boolean hasFocus) {
                if (hasFocus) {
                    shouldCallMaskingMethod=true;
                    releaseFocusEvent(hasFocus);
                }
                else{
                    shouldCallMaskingMethod=false;
                    releaseFocusEvent(hasFocus);

                }
            }
        });
    }

    private void releaseFocusEvent( Boolean focus){
        WritableMap event = Arguments.createMap();
        event.putBoolean("focus", focus);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "focusEvent",
                event);
    }


    private void onSubmitPressed(){

      final  EditText editText = this;

        this.setOnEditorActionListener(new OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                boolean handleSubmit = false;

                if (actionId == EditorInfo.IME_ACTION_GO || actionId == EditorInfo.IME_ACTION_DONE
                        || actionId == EditorInfo.IME_ACTION_NEXT || actionId == EditorInfo.IME_ACTION_SEARCH) {

                    handleSubmit = true;

                    releaseSubmitEvent();

                    textChange(editText.getText().toString());


                    InputMethodManager inputMethodManager = (InputMethodManager) editText.getContext().getSystemService(
                            Context.INPUT_METHOD_SERVICE);
                    inputMethodManager.hideSoftInputFromWindow(editText.getApplicationWindowToken(), 0);
                }
                return handleSubmit;
            }

        });
    }

    private void releaseSubmitEvent(){
        WritableMap event = Arguments.createMap();
        event.putString("text", this.getText().toString());
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "submitPressed",
                event);
    }



    private void changeTextListener(){

        final   EditText editText = this;

        this.addTextChangedListener(new TextWatcher() {

            public void afterTextChanged(Editable text) {

                int beginIndex = spannable.getSpanStart(span);
                int endIndex = spannable.getSpanEnd(span);


                if(shouldCallMaskingMethod){
                    callMaskingMethods( editText,beginIndex, endIndex);
                }


            }

            public void beforeTextChanged(CharSequence text, int start,
                                          int count, int after) {
            }

            public void onTextChanged(CharSequence text, int start,
                                      int before, int count) {

                spannable  = new SpannableString(text);
                span = new RelativeSizeSpan(1.0f);

                spannable.setSpan(span, start, start + count, Spanned.SPAN_COMPOSING);

            }
        });
    }

    private void callMaskingMethods( EditText editText, int beginIndex, int endIndex){

        int _length   = maskFormat.length();


        if( maskType.equals("credit-card") ){

            if(shouldMaskInput()){
                try{
                    Log.d("shouldMaskInput 1 ", "afterTextChanged: " );
                    this.setMaxLength(_length);
                    creditCardMasking( editText, beginIndex, endIndex );
                }
                catch (Exception e){
                    Log.d("afterTextChanged", "afterTextChanged: "+e);
                }
            }
            else{
                Log.d("shouldMaskInput called", "afterTextChanged: " +lengthOfInput);
                if(editText.getText().toString().length()>0)
                this.setMaxLength(lengthOfInput);
            }

        }
        else if( maskType.equals("phone-number") ){
            if(shouldMaskInput()){
                Log.d("state check D 2  ", "shouldMaskInput: " );

                try{
                    this.setMaxLength(_length);
                    phoneNumberMasking( editText, beginIndex, endIndex );
                }
                catch (Exception e){
                    Log.d("afterTextChanged", "afterTextChanged: "+e);
                }
            }
            else{
                Log.d("state check D 1 e   ", "shouldMaskInput: " +lengthOfInput);
                if(editText.getText().toString().length()>0)
                    this.setMaxLength(lengthOfInput);
            }

        }
        else{
            if(shouldMaskInput()){

                try{
                    this.setMaxLength(_length);
                    defaultMasking( editText, beginIndex, endIndex );
                }
                catch (Exception e){
                    Log.d("defaultMasking", "defaultMasking: "+e);
                }
            }
            else{
                Log.d("defaultMasking called", "defaultMasking: " +lengthOfInput);
                if(editText.getText().toString().length()>0)
                    this.setMaxLength(lengthOfInput);
            }
        }
    }

    private Boolean shouldMaskInput(){

        String text = this.getText().toString();
        Boolean flag = true ;

        int start = 0;

        if(maskFormat.length() <= 0){
            releaseErrorForMasking( errorMessages[2] );
            return false;
        }

        if( maskType.equals("phone-number") ){

            start = startIndex + 1;

        }
        else{
            start = 0;
        }


        if( text.length() <= 0){
            flag = false;
        }
        else {

            for (int i = start; i < text.length(); i++) {

                if (maskFormat.charAt(i) == maskDigit
                        && !Character.isDigit(text.charAt(i))  ) {
                    Log.d("state check D 1 ", "shouldMaskInput: "+text.charAt(i)+"  "+maskFormat.charAt(i)+" "+i);
                    lengthOfInput = i+1;
                    flag = false;
                    releaseErrorForMasking( errorMessages[0] );

                    break;

                } else if (maskFormat.charAt(i) == maskAlphabet
                        && !Character.isLetter(text.charAt(i)) ) {
                    Log.d("state check A 1 ", "shouldMaskInput: "+text.charAt(i)+"  "+maskFormat.charAt(i)+" "+i);
                    lengthOfInput = i+1;
                    flag = false;
                    releaseErrorForMasking( errorMessages[1] );

                    break;
                }
                else{
                    if(maskFormat.charAt(i) == maskFormat.charAt(startIndex) ){



                        if( maskFormat.charAt( i +1 ) == maskDigit
                                && !Character.isDigit(text.charAt( i ))
                                && text.charAt(i) != maskFormat.charAt(startIndex)  ){

                            releaseErrorForMasking( errorMessages[0] );

                            lengthOfInput = i;

                            flag = false;

                            break;
                        }
                        else if( maskFormat.charAt(i + 1) == maskAlphabet
                                && !Character.isLetter(text.charAt( i ))
                                && text.charAt(i) != maskFormat.charAt(startIndex) ){


                            releaseErrorForMasking( errorMessages[1] );
                            lengthOfInput = i;
                            flag = false;

                            break;
                        }

                    }

                }

            }


        }


        return flag;
    }

    private void CheckForStartIndex(){
        if(maskFormat != null)
            for( int i = 1; i < maskFormat.length(); i++){
                if(!(Character.isDigit(maskFormat.charAt(i))) && !(Character.isLetter(maskFormat.charAt(i)))){
                    startIndex = i;
                    i = maskFormat.length();
                }
            }
    }

     private void phoneNumberMasking(EditText editText, int beginIndex, int endIndex){



        if( editText.getText().toString().length() > 0  ){

            if( maskFormat.charAt(0) != editText.getText().toString().charAt(0)  ){

                String updatedText ;
                updatedText = editText.getText().toString();
                for( int i = 0; i < startIndex; i++){
                    updatedText = addCharAtPosition( updatedText, maskFormat.charAt(i), i);
                }

                editText.setText(updatedText);
                Selection.setSelection(editText.getText(), editText.getText().length());


            }

                 textChange(editText.getText().toString());
        }


        boolean firstSymbolFlag = false;
        char separator = ' ';

        for( int i = startIndex ; i < endIndex; i++){

            char maskFormatCharacter = maskFormat.charAt(i);
            char textFieldCharacter = editText.getText().toString().charAt(i);

            if( !(Character.isDigit(maskFormatCharacter)) && !(Character.isLetter(maskFormatCharacter))
                    && (firstSymbolFlag == false ) ){

                firstSymbolFlag = true;
                separator = maskFormatCharacter;

            }

            if(firstSymbolFlag && (  maskFormatCharacter == separator && textFieldCharacter != separator  )){

                String updatedText = addCharAtPosition( editText.getText().toString(), separator, i);

                editText.setText(updatedText);
                Selection.setSelection(editText.getText(), editText.getText().length());

                textChange(editText.getText().toString());

            }

        

        }


    }
    

    private void creditCardMasking(EditText editText, int beginIndex, int endIndex){

        Log.d("creditCardMasking", "creditCardMasking: I am called");

        char separator = maskFormat.charAt(startIndex);

        for( int i = beginIndex ; i <endIndex; i++){

            char maskFormatCharacter = maskFormat.charAt(i);
            char textFieldCharacter = editText.getText().toString().charAt(i);


            if( maskFormatCharacter == separator && textFieldCharacter != separator ){

                String updatedText = addCharAtPosition( editText.getText().toString(), maskFormatCharacter, i);

                editText.setText(updatedText);
                Selection.setSelection(editText.getText(), updatedText.length());

            }

            textChange(editText.getText().toString());

        }
    }

    private void defaultMasking(EditText editText, int beginIndex, int endIndex){

        char separator = maskFormat.charAt(startIndex);

        for( int i = beginIndex ; i <endIndex; i++){

            char maskFormatCharacter = maskFormat.charAt(i);
            char textFieldCharacter = editText.getText().toString().charAt(i);


            if( maskFormatCharacter == separator && textFieldCharacter != separator ){

                String updatedText = addCharAtPosition( editText.getText().toString(), maskFormatCharacter, i);

                editText.setText(updatedText);
                Selection.setSelection(editText.getText(), updatedText.length());

            }

            textChange(editText.getText().toString());

        }
    }

    private String addCharAtPosition(String str, char ch, int position) {
        StringBuilder sb = new StringBuilder(str);
        sb.insert(position, ch);
        return sb.toString();
    }

    private void textChange(String text) {
        WritableMap event = Arguments.createMap();
        event.putString("text", text);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "textChange",
                event);
    }

    private void releaseErrorForMasking( String message ){
        WritableMap event = Arguments.createMap();
        event.putString("error", message);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "ErrorForMasking",
                event);
    }

    private void setMaxLength( int length ){
        try{
            this.setFilters(new InputFilter[]{new InputFilter.LengthFilter(length)});
        }
        catch ( Exception e ){
            Log.d("maxLength", "maxLength: "+e);
        }
    }





    //    ******************* Methods visible to other classes ********************

    public void focus(){

        this.requestFocus();

        InputMethodManager inputMethodManager = (InputMethodManager) this.getContext().getSystemService(
                Context.INPUT_METHOD_SERVICE);

        inputMethodManager.showSoftInput(this, InputMethodManager.SHOW_IMPLICIT);

    }


    public void blur(){


        InputMethodManager inputMethodManager = (InputMethodManager) this.getContext().getSystemService(
                Context.INPUT_METHOD_SERVICE);

        inputMethodManager.hideSoftInputFromWindow(this.getWindowToken(), 0);

        this.clearFocus();

    }

    public void setFontSize( float size ){
        try{
            this.setTextSize(size);

        }
        catch (Exception e){
            Log.d("setTextSize", "setTextSize: "+e);
        }

    }

    public void setBottomColor( int color ){
        try{
            ColorStateList colorStateList = ColorStateList.valueOf(color);
            ViewCompat.setBackgroundTintList(this,colorStateList);
        }
        catch (Exception e){
            Log.d("SetBottomColor", "setBottomColor: "+e);
        }

    }

    public void setPlaceHolder( String placeHolder ){
        try{
            this.setHint(placeHolder);
        }
        catch (Exception e){
            Log.d("setPlaceHolder", "setPlaceHolder: "+e);
        }

    }

    public void setPlaceHolderColor( int placeHolderColor ){
        try{
            this.setHintTextColor(placeHolderColor);
        }
        catch (Exception e){
            Log.d("setPlaceHolderColor", "setPlaceHolderColor: "+e);
        }

    }

    public void setTextColor( int textColor ){
        try{
            ColorStateList colorStateList = ColorStateList.valueOf(textColor);
            this.setTextColor(colorStateList);
        }
        catch (Exception e){
            Log.d("setTextColor", "setTextColor: "+e);
        }
    }

    public void disabled( boolean disable ){
        try{
            this.setEnabled(!disable);
            this.setFocusable(!disable);
            this.setCursorVisible(false);
            this.setKeyListener(null);
            this.setBackgroundColor(Color.TRANSPARENT);
        }
        catch (Exception e){
            Log.d("setEnabled", "setEnabled: "+e);
        }
    }

    public void setValue( String value ){
        try{
            int beginIndex = spannable.getSpanStart(span);
            int endIndex = spannable.getSpanEnd(span);

            if( this.getText().toString().equals("") ){

                this.setText(value);

            }

        }
        catch (Exception e){
            Log.d("setValue", "setValue: "+e);
        }
    }

    public void setTextAlign( String textAlign ){

        try{
            if(textAlign.equals("Right") ){
                this.setGravity(Gravity.BOTTOM + Gravity.RIGHT);
                this.setTextDirection(TEXT_DIRECTION_RTL);
            }

            if(textAlign.equals("Left") ){
                this.setGravity(Gravity.BOTTOM + Gravity.LEFT);
                this.setTextDirection(TEXT_DIRECTION_LTR);
            }
        }
        catch ( Exception e ){
            Log.d("setTextAlign", "setTextAlign: "+e);
        }

    }

    public void setKeyboardType( String keyboardType ){

        try{
            switch ( keyboardType ){
                case "number-pad":{
                    this.setInputType(InputType.TYPE_CLASS_NUMBER);
                    break;
                }
                case "date-time":{
                    this.setInputType(InputType.TYPE_CLASS_DATETIME);
                    break;
                }
                case "email-address":{
                    this.setInputType(InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
                    break;
                }
                case "password":{
                    this.setTransformationMethod(PasswordTransformationMethod.getInstance());
                }

                default:
                    this.setInputType(InputType.TYPE_CLASS_TEXT);
                    break;
            }
        }
        catch ( Exception e ){
            Log.d("setKeyboardType", "setKeyboardType: "+e);
        }

    }

    public void setReturnType( String returnType ){

        try{
            switch ( returnType ){

                case "go":{
                    this.setImeOptions(EditorInfo.IME_ACTION_GO);
                    break;
                }
                case "next":{
                    this.setImeOptions(EditorInfo.IME_ACTION_NEXT);
                    break;
                }
                case "search":{

                    this.setImeOptions(EditorInfo.IME_ACTION_SEARCH);
                    break;
                }

                default:
                    this.setImeOptions(EditorInfo.IME_ACTION_DONE);
                    break;
            }
        }
        catch ( Exception e ){
            Log.d("setReturnType", "setReturnType: "+e);
        }

    }

    public void setMaskType( String maskType ){
        this.maskType = maskType;
    }

    public void setMaskFormat( String maskFormat ){
        this.maskFormat = maskFormat;
        try{
            this.setFilters(new InputFilter[]{new InputFilter.LengthFilter(maskFormat.length())});
            this.CheckForStartIndex();
        }
        catch (Exception e){
            Log.d("setMaskFormat", "setMaskFormat: "+e);
        }

    }

    public void setFontFamily( String fontFamily ){
        try{
            Log.d("setFontFamily", "setFontFamily: "+fontFamily);
            Typeface fontFace =  Typeface.createFromAsset( getContext().getAssets(),
                    "fonts/"+fontFamily);
            this.setTypeface(fontFace);

        }
        catch (Exception e){
            Log.d("setFontFamily", "setFontFamily: "+e);
        }
    }

}
