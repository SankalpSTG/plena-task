export enum RMQueues {
  AccessKeyUpdatesQueue = 'access-key-updates-queue',
  AccessKeyLogsQueue = 'access-key-logs-queue',
}

export enum RMQServices {
  AccessKeyUpdatesService = 'access-key-updates-service',
  AccessKeyLogsService = 'access-key-logs-service',
}

export enum RMQEvents {
  AccessKeyCreated="access-key-created",
  AccessKeyUpdated="access-key-updated",
  AccessKeyDeleted="access-key-deleted",
  AccessKeyStatusUpdated="access-key-status-updated",

  AccessKeyLogEvent="access-key-log-event"
}
