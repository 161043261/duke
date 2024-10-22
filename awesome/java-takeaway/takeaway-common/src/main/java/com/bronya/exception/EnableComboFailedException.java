package com.bronya.exception;

// enable combo failed 起售套餐失败
public class EnableComboFailedException extends BaseException {

    public EnableComboFailedException(){}

    public EnableComboFailedException(String msg){
        super(msg);
    }
}
