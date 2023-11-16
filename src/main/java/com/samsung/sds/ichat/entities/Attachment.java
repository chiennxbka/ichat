package com.samsung.sds.ichat.entities;

import com.samsung.sds.ichat.entities.id.GroupMessagePK;
import com.samsung.sds.ichat.enums.FileType;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_attachment", schema = "public", catalog = "ichat")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attachment_id", nullable = false)
    private long attachmentId;

    @Basic
    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Basic
    @Column(name = "path", nullable = false)
    private String path;

    @Basic
    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private FileType type;

    @Basic
    @Column(name = "message_id")
    private Long messageId;

    @Basic
    @Column(name = "channel_id")
    private Long channelId;
}
