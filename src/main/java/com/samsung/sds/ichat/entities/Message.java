package com.samsung.sds.ichat.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

@Getter
@Entity
@EqualsAndHashCode
@Table(name = "tbl_message", schema = "public", catalog = "ichat")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private long messageId;

    @Basic
    @Column(name = "content", nullable = false, length = -1)
    private String content;

    @ManyToOne
    @JoinColumn(name = "receiver", referencedColumnName = "id", nullable = false)
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "sender", referencedColumnName = "id", nullable = false)
    private User sender;

    @Basic
    @Column(name = "has_drop_down")
    private boolean hasDropDown;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", referencedColumnName = "message_id")
    private Message parentMessage;

    @OneToMany(mappedBy = "parentMessage", fetch = FetchType.LAZY)
    private Collection<Message> childMessages;

    @Basic
    @Column(name = "created_at")
    private Timestamp createdAt;
}
