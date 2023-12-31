import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
        <Image
          src='/documents.png'
          alt="Documents"
          className="object-contain dark:hidden"
          fill
        />
         <Image
          src='/documents-dark.png'
          alt="Documents"
          className="object-contain hidden dark:block"
          fill
        />
      </div>
      <div className="relative w-[400px] h-[400px] hidden md:block">
        <Image
          src='/reading.png'
          alt="Reading"
          className="object-contain dark:hidden"
          fill
        />
          <Image
          src='/reading-dark.png'
          alt="Documents"
          className="object-contain hidden dark:block"
          fill
        />
      </div>
    </div>
  );
};

export default Heroes;
