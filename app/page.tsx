import { Post } from "../library/typings";
import SubscriptionForm from "../app/components/SubscriptionForm";

interface Props {
  posts: [Post];
}
export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div>
      <main className="font-bodyFont max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text--900  sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Madinku Mabala
        </h1>
        <div>
          <br />
          <p className="md:text-l">
            {" "}
            Hi, Welcome to my blog. As an individual you have plans, goals and
            desires that you one day wish to archive. Learning programming was
            certainly not one of them for me. I am surrounded by computer
            scientists, network administrators and IT technicians and this is
            where I drew my inspiration from. I am a self taught web developer.
            I have had countless sleepless nights figuring out and learning
            coding on my own. I have learned so much discipline ever since I
            have started coding and and my skills have improved for the better.
          </p>
          <br />
          <p className="md:text-l">
            I have build a few websites using different programming languages
            and I will share what I know about coding as I learn more different
            languages.
          </p>
        </div>
        <br />

        <SubscriptionForm />
      </main>
    </div>
  );
}
