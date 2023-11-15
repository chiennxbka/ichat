package com.samsung.sds.ichat.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Channel {

    private int id;
    private String name;
    private String members;
    private String profile;
    private int messagecount;
}
