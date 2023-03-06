package com.GGULBOO.GGULBOO.dto;

import com.GGULBOO.GGULBOO.entity.AccountBookEntity;
import com.GGULBOO.GGULBOO.entity.UserEntity;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AccountBookDTO {
    private Long id; // 장부 내역 id
    private Date date; // 장부 입력날짜
    private Long income ; // 수입
    private Long expenditure; // 지출
    private String expenditureReason; // 지출사유
    private UserEntity user; // 사용자
    private String platform; // 플랫폼

    public static AccountBookDTO toAccountBookDTO(AccountBookEntity accountBookEntity){
        AccountBookDTO accountBookDTO = new AccountBookDTO();
        accountBookDTO.setId(accountBookEntity.getId());
        accountBookDTO.setDate(accountBookEntity.getDate());
        accountBookDTO.setIncome(accountBookEntity.getIncome());
        accountBookDTO.setExpenditure(accountBookEntity.getExpenditure());
        accountBookDTO.setExpenditureReason(accountBookEntity.getExpenditureReason());
        accountBookDTO.setUser(accountBookEntity.getUser());
        accountBookDTO.setPlatform(accountBookEntity.getPlatform());
        return accountBookDTO;
    }
}

