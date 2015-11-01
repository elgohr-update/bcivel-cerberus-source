/*
 * Cerberus  Copyright (C) 2013  vertigo17
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This file is part of Cerberus.
 *
 * Cerberus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Cerberus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cerberus.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.cerberus.crud.service.impl;

import java.util.List;
import org.cerberus.crud.dao.ICountryEnvParam_logDAO;

import org.cerberus.crud.entity.CountryEnvParam_log;
import org.cerberus.crud.entity.MessageGeneral;
import org.cerberus.crud.service.ICountryEnvParam_logService;
import org.cerberus.enums.MessageGeneralEnum;
import org.cerberus.enums.MessageEventEnum;
import org.cerberus.exception.CerberusException;
import org.cerberus.util.answer.Answer;
import org.cerberus.util.answer.AnswerItem;
import org.cerberus.util.answer.AnswerList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author vertigo17
 */
@Service
public class CountryEnvParam_logService implements ICountryEnvParam_logService {

    @Autowired
    private ICountryEnvParam_logDAO countryEnvParamLogDao;

    @Override
    public AnswerItem readByKey(Long id) {
        return countryEnvParamLogDao.readByKey(id);
    }

    @Override
    public AnswerList readAll() {
        return readByVariousByCriteria(null, null, null, null, null, 0, 0, "id", "asc", null, null);
    }

    @Override
    public AnswerList readByVariousByCriteria(String system, String country, String environment, String build, String revision, int startPosition, int length, String columnName, String sort, String searchParameter, String string) {
        return countryEnvParamLogDao.readByVariousByCriteria(system, country, environment, build, revision, startPosition, length, columnName, sort, searchParameter, string);
    }

    @Override
    public boolean exist(Long id) {
        try {
            convert(readByKey(id));
            return true;
        } catch (CerberusException e) {
            return false;
        }
    }

    @Override
    public Answer create(CountryEnvParam_log countryEnvParamLog) {
        return countryEnvParamLogDao.create(countryEnvParamLog);
    }

    @Override
    public Answer delete(CountryEnvParam_log countryEnvParamLog) {
        return countryEnvParamLogDao.delete(countryEnvParamLog);
    }

    @Override
    public Answer update(CountryEnvParam_log countryEnvParamLog) {
        return countryEnvParamLogDao.update(countryEnvParamLog);
    }

    @Override
    public CountryEnvParam_log convert(AnswerItem answerItem) throws CerberusException {
        if (answerItem.isCodeEquals(MessageEventEnum.DATA_OPERATION_OK.getCode())) {
            //if the service returns an OK message then we can get the item
            return (CountryEnvParam_log) answerItem.getItem();
        }
        throw new CerberusException(new MessageGeneral(MessageGeneralEnum.DATA_OPERATION_ERROR));
    }

    @Override
    public List<CountryEnvParam_log> convert(AnswerList answerList) throws CerberusException {
        if (answerList.isCodeEquals(MessageEventEnum.DATA_OPERATION_OK.getCode())) {
            //if the service returns an OK message then we can get the item
            return (List<CountryEnvParam_log>) answerList.getDataList();
        }
        throw new CerberusException(new MessageGeneral(MessageGeneralEnum.DATA_OPERATION_ERROR));
    }

    @Override
    public void convert(Answer answer) throws CerberusException {
        if (answer.isCodeEquals(MessageEventEnum.DATA_OPERATION_OK.getCode())) {
            //if the service returns an OK message then we can get the item
            return;
        }
        throw new CerberusException(new MessageGeneral(MessageGeneralEnum.DATA_OPERATION_ERROR));
    }

}
