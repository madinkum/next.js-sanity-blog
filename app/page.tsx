
import SubscriptionForm from "./components/SubscriptionForm";

export default function Home() {
  return (
    <div>
      <br />
      <br />
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
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
          where I drew my inspiration from. I am a self taught web developer. I
          have had countless sleepless nights figuring out and learning coding
          on my own. I have learned so much discipline ever since I have started
          coding and and my skills have improved for the better.
        </p>
        <br />
        <p className="md:text-l">
          I have build a few websites using different programming languages and
          I will share what I know about coding as I learn more different
          languages.
        </p>
      </div>
      <br />
      <br />
      <SubscriptionForm />
     
    </div>
  );
}
