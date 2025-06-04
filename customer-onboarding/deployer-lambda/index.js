const AWS = require('aws-sdk');
const logs = new AWS.CloudWatchLogs();

const SUBSCRIPTION_NAME = 'LambdaColdStartLogForward';
const DESTINATION_ARN = process.env.DESTINATION_ARN;
const ROLE_ARN = process.env.FORWARDER_ROLE_ARN;

async function subscribeLogGroup(logGroupName) {
  // Don't subscribe if already exists
  const filters = await logs.describeSubscriptionFilters({ logGroupName }).promise();
  if (filters.subscriptionFilters.some(f => f.filterName === SUBSCRIPTION_NAME)) return;

  await logs.putSubscriptionFilter({
    logGroupName,
    filterName: SUBSCRIPTION_NAME,
    filterPattern: '"START RequestId"', // adjust if you want
    destinationArn: DESTINATION_ARN,
    roleArn: ROLE_ARN,
  }).promise();
  console.log(`Subscribed: ${logGroupName}`);
}

exports.handler = async (event) => {
  // 1. If EventBridge, only subscribe the new log group
  if (event.detail && event.detail.requestParameters && event.detail.requestParameters.logGroupName) {
    const logGroupName = event.detail.requestParameters.logGroupName;
    if (logGroupName.startsWith('/aws/lambda/')) {
      await subscribeLogGroup(logGroupName);
    }
    return;
  }

  // 2. No event (manual or first deploy), subscribe all
  let nextToken;
  do {
    const resp = await logs.describeLogGroups({
      logGroupNamePrefix: '/aws/lambda/',
      nextToken,
    }).promise();
    for (const group of resp.logGroups) {
      await subscribeLogGroup(group.logGroupName);
    }
    nextToken = resp.nextToken;
  } while (nextToken);
};

