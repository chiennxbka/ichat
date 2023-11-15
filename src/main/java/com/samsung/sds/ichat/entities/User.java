package com.samsung.sds.ichat.entities;

import com.samsung.sds.ichat.enums.Role;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_user")
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private Integer id;
  private String firstname;
  private String lastname;
  @Column(name = "email", unique = true)
  private String email;
  private String password;
  private String status;
  private String profile;
  @Enumerated(EnumType.STRING)
  private Role role;
  @Column(name = "connected", nullable = false)
  private boolean connected = false;
  @OneToMany(mappedBy = "user")
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
