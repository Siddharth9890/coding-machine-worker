import * as amqp from "amqp-connection-manager";
import check from "../checkLanguage";
const QUEUE_NAME = "judge";

const connection = amqp.connect([process.env.RABBITMQ!]);

const onMessage = (data: any) => {
  let message = JSON.parse(data.content.toString());
  check(message, channelWrapper, data);
};

// Set up a channel listening for messages in the queue.
const channelWrapper = connection.createChannel({
  setup: function (channel: any) {
    // `channel` here is a regular amqplib `ConfirmChannel`.
    return Promise.all([
      channel.assertQueue(QUEUE_NAME, { durable: true }),
      channel.prefetch(1),
      channel.consume(QUEUE_NAME, onMessage),
    ]);
  },
});

channelWrapper.waitForConnect().then(function () {
  console.log("Listening for messages");
});

export default connection;
