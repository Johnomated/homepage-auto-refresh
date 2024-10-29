import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

import QueueEntry from "../../components/widgets/queue/queueEntry";

function getProgress(sizeLeft, size) {
  return sizeLeft === 0 ? 100 : (1 - sizeLeft / size) * 100;
}

function fromUnits(value) {
  const units = ["B", "K", "M", "G", "T", "P"];
  const [number, unit] = value.split(" ");
  const index = units.indexOf(unit);
  if (index === -1) {
    return 0;
  }
  return parseFloat(number) * 1024 ** index;
}

const defaultInterval = 30000;
const defaultLimit = 5;

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const enableQueue = !!widget?.enableQueue; // default false

  const { data: queueData, error: queueError } = widget?.refreshInterval
    ? useWidgetAPI(widget, "queue", {
        refreshInterval: Math.max(1000, widget.refreshInterval),
        limit: widget?.limit ? widget.limit : defaultLimit,
      })
    : useWidgetAPI(widget, "queue", {
        refreshInterval: defaultInterval,
        limit: widget?.limit ? widget.limit : defaultLimit,
      });

  if (queueError) {
    return <Container service={service} error={queueError} />;
  }

  if (!queueData) {
    return (
      <Container service={service}>
        <Block label="sabnzbd.rate" />
        <Block label="sabnzbd.queue" />
        <Block label="sabnzbd.timeleft" />
      </Container>
    );
  }

  return (
    <>
      <Container service={service}>
        <Block label="sabnzbd.rate" value={t("common.byterate", { value: fromUnits(queueData.queue.speed) })} />
        <Block label="sabnzbd.queue" value={t("common.number", { value: queueData.queue.noofslots })} />
        <Block label="sabnzbd.timeleft" value={queueData.queue.timeleft} />
      </Container>
      {enableQueue &&
        queueData.queue.slots.map((slot) => (
          <QueueEntry
            progress={getProgress(slot.mbleft, slot.mb)}
            timeLeft={slot.timeleft}
            title={slot.filename} // title={`Placeholder Title ${slot.index}`}
            activity={slot.percentage === "0" ? "Queued" : slot.status}
            key={slot.nzo_id}
          />
        ))}
    </>
  );
}
