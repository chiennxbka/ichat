package com.samsung.sds.ichat.model.callList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CallList {
    private int id;
    private String name;
    private String dateTime;
    private String profile;
    private String callTime;
    private String callVideo;
    private String callTypeIcon;
    private String callArrowType;
    private boolean mutipleUsercalls;
    private String multipleUsers;
}
