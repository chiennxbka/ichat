package com.samsung.sds.ichat.model.user;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Users {

    private List<User> users;
    private List<User> favorites;
    private List<Channel> channels;

}
