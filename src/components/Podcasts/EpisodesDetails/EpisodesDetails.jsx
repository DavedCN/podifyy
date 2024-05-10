import Button from "../../Common/Button/Button";

const EpisodeDetails = ({ index, title, desc, audioFile, onClick }) => {
  return (
    <div className="my-5 ">
      <h1 className="text-left my-2 text-xl">
        {index}. {title}
      </h1>
      <div className="ml-3 text-lg">
        <p className="text-left text-purple-grey ">{desc}</p>

        <Button
          margin={"m-0 my-4"}
          width={"w-28"}
          text="Play"
          onClick={() => onClick(audioFile)}
        />
      </div>
    </div>
  );
};

export default EpisodeDetails;
