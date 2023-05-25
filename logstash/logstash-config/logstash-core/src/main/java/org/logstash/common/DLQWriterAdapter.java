/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


package org.logstash.common;

import co.elastic.logstash.api.DeadLetterQueueWriter;
import co.elastic.logstash.api.Event;
import co.elastic.logstash.api.Plugin;

import java.io.IOException;
import java.util.Objects;

public class DLQWriterAdapter implements DeadLetterQueueWriter {

    private final org.logstash.common.io.DeadLetterQueueWriter dlqWriter;

    public DLQWriterAdapter(org.logstash.common.io.DeadLetterQueueWriter dlqWriter) {
        this.dlqWriter = Objects.requireNonNull(dlqWriter);
    }

    @Override
    public void writeEntry(Event event, Plugin plugin, String reason) throws IOException {
        dlqWriter.writeEntry((org.logstash.Event) event, plugin.getName(), plugin.getId(), reason);
    }

    @Override
    public boolean isOpen() {
        return dlqWriter != null && dlqWriter.isOpen();
    }

    @Override
    public long getCurrentQueueSize() {
        return dlqWriter != null ? dlqWriter.getCurrentQueueSize() : 0;
    }
}
