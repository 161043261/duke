package com.bronya.exception;

// update password failed 更新密码失败
public class UpdatePasswordFailedException extends BaseException{

    public UpdatePasswordFailedException(String msg){
        super(msg);
    }

}
