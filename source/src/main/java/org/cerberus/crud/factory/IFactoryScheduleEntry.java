package org.cerberus.crud.factory;


/* Cerberus Copyright (C) 2013 - 2017 cerberustesting
DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.

This file is part of Cerberus.

Cerberus is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Cerberus is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Cerberus.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 *
 * @author cdelage
 */
import org.cerberus.crud.entity.ScheduleEntry;
import java.sql.Timestamp;

public interface IFactoryScheduleEntry {

    /**
     *
     * @param ID
     * @param type
     * @param name
     * @param cronDefinition
     * @param lastExecution
     * @param active
     * @param UsrCreated
     * @param DateCreated
     * @param UsrModif
     * @param DateModif
     * @return
     */
    ScheduleEntry create(long ID, String type, String name, String cronDefinition, Timestamp lastExecution, String active, String UsrCreated, Timestamp DateCreated, String UsrModif, Timestamp DateModif);
}
