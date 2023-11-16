package com.samsung.sds.ichat.entities;

import com.samsung.sds.ichat.entities.id.GroupMessagePK;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_goup_message", schema = "public", catalog = "ichat")
@IdClass(GroupMessagePK.class)
public class GroupMessage {
    @Id
    private long channelId;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long messageId;

    @Basic
    @Column(name = "content", nullable = false, length = -1)
    private String content;

    /*@Basic
    @Column(name = "sender", nullable = false)
    private int sender;*/

    @ManyToOne
    @JoinColumn(name = "sender", referencedColumnName = "id", nullable = false)
    private User sender;

    @Basic
    @Column(name = "has_drop_down")
    private boolean hasDropDown;

    @Basic
    @Column(name = "created_at")
    private Timestamp createdAt;
}
