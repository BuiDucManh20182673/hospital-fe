import { Tag } from "antd";

const renderTag = (status) => {
  switch (status) {
    case "CONFIRM":
      return <Tag color="red">{status}</Tag>;
    case "DONE":
      return <Tag color="green">{status}</Tag>;
    case "IN_PROCESS":
      return <Tag color="yellow">{status}</Tag>;
    case "NORMAL":
      return <Tag color="yellow">{status}</Tag>;
    case "GOOD":
      return <Tag color="green">{status}</Tag>;
    case "ALARM":
      return <Tag color="red">{status}</Tag>;
    default:
  }
};
export { renderTag };
