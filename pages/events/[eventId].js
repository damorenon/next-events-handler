import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContact from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function EventDetailPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return (
            <>
                <ErrorAlert>
                    <p>No event found!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show all events</Button>
                </div>
            </>
        );
    }

    const { description, title, date, location, image } = event;

    return (
        <>
            <EventSummary title={title} />
            <EventLogistics
                date={date}
                address={location}
                image={image}
                imageAlt={title}
            />
            <EventContact>
                <p>{description}</p>
            </EventContact>
        </>
    );
}

export default EventDetailPage;
