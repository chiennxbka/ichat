package com.samsung.sds.ichat.repository;

import com.samsung.sds.ichat.entities.GroupMessage;
import com.samsung.sds.ichat.entities.id.GroupMessagePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelMessageRepository extends JpaRepository<GroupMessage, GroupMessagePK> {
}
