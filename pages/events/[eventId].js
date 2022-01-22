import { getEventById, getFeaturedEvents } from "../../helper/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContact from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";
import Button from "../../components/ui/button";
import Head from "next/head";

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

    const { id, description, title, date, location, image } = event;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
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
            <Comments eventId={id} />
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
