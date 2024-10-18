package com.bronya.chat;

import io.netty.channel.Channel;

public interface IService {
}

interface UserService {
  boolean login(String username, String password);
}

interface Session {
  void bind(Channel channel, String username);
  void unbind(Channel channel);
  void getAttr(Channel channel, String attrName);
  void setAttr(Channel channel, String attrName, Object value);
  Channel getChan(String username);
}
