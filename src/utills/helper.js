import moment from "moment";

export const messageFormater = (data, fromId, toId) => {
  var messages = [];
  for (let i = 0; i < data.length; i++) {
    var msg = {};
    msg["_id"] = i;
    msg["text"] = data[i].message;
    msg["user"] = {
      _id: data[i].fromSelf ? 1 : 2,
      sender_id: data[i].fromSelf ? fromId : toId,
      name: "SocialMarketplace",
      //   avatar: getMainImageUrl(match?.matchedUserDetail),
    };
    messages.push(msg);
    // console.log('\n\n formater ==> ', msg);
  }
  return messages.reverse();
};

export const notificationFormater = (data) => {
  var todayNotification = data.filter((obj) =>
    moment().isSame(obj.createdAt, "day")
  );

  var yesterdayNotification = data.filter(
    (obj) =>
      moment(moment().subtract(1, "day")).format("DD-MM-yyyy") ==
      moment(obj.createdAt).format("DD-MM-yyyy")
  );

  var previousNotification = data.filter((obj) =>
    moment(moment(moment().subtract(1, "day")).format("DD-MM-yyyy")).isAfter(
      moment(obj.createdAt).format("DD-MM-yyyy"),
      "day"
    )
  );

  var allNotifications = [
    {
      title: "Today",
      data: todayNotification.reverse(),
    },
    {
      title: "Yesterday",
      data: yesterdayNotification.reverse(),
    },
    {
      title: "Previous",
      data: previousNotification.reverse(),
    },
  ];

  return allNotifications;
};

export const unReadNotification = (data) => {
  if (!data) return 0;
  var unReadNotification = data.filter((obj) => obj.isRead == false);
  return unReadNotification.length;
};

export const bidFormater = (data) => {
  if (data) return data.reverse();
  else return;
};

export function generateUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function generateUIDforList() {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
