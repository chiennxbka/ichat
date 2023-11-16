package com.samsung.sds.ichat.entities.id;

import lombok.*;


import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class GroupMessagePK implements Serializable {
    private long channelId;

    private long messageId;
}
