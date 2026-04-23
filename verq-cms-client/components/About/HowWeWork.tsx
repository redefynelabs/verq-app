import ContainerLayout from "@/containerLayout/ContainerLayout";
import { AboutPageHowWeWork } from "@/service/fetchAboutPage";

const HowWeWork = ({ data }: { data: AboutPageHowWeWork }) => {
  return (
    <ContainerLayout className=" px-10! min-h-[80dvh] py-20">
      <div className=" space-y-5">
        <div className=" max-w-md">
          <h2 className=" text-6xl md:text-8xl text-secondary  mb-6">
            {data.Title}
          </h2>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 md:w-[80%]">
          {data.Points.map((item) => (
            <div
              key={item.id}
              className=" font-family-inter tracking-tight space-y-4"
            >
              <h3 className=" text-primary text-xl font-medium">
                {item.title}
              </h3>
              <p className=" text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </ContainerLayout>
  );
};

export default HowWeWork;
