import { getEventById, getFeaturedEvents } from "../../helper/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContact from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";

function EventDetailPage({ selectedEvent }) {
    const event = selectedEvent;

    if (!event) {
        return (
            <>
                <div className="center">
                    <p>Loading...</p>
                </div>
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

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map((event) => ({
        params: {
            eventId: event.id
        }
    }));
    return { paths, fallback: "blocking" };
}

export default EventDetailPage;
