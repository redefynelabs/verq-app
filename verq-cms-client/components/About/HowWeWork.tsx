import ContainerLayout from "@/containerLayout/ContainerLayout";
import React from "react";

const HowWeWork = () => {
  const workContent = [
    {
      title: "Background",
      description:
        "Our team of creative experts specializes in delivering comprehensive brandingsolutions, from eye- catchinglogos and cohesive visualidentities to cutting-edgewebsites, mobile apps, andengaging multimedia content",
    },
    {
      title: "What we do",
      description:
        "We are a concept driven brand design agency that helps companies build,communicate and strengthen their brand identities and ideas.",
    },
    {
      title: "Philosophy",
      description:
        "We always work in regards tothe final output, be it an application, website, product etc. Since final output is where the identity should thrive and not in an impressive design presentation or PDF.",
    },
  ];
  return (
    <ContainerLayout className=" px-10! min-h-[80dvh] py-20">
      <div className=" space-y-5">
        <div className=" max-w-md">
          <h2 className=" text-6xl md:text-8xl text-secondary  mb-6">
            This is how we work
          </h2>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 md:w-[80%]">
          {workContent.map((item, index) => (
            <div
              key={index}
              className=" font-family-inter tracking-tight space-y-4"
            >
              <h3 className=" text-primary text-xl font-medium">
                {item.title}
              </h3>
              <p className=" text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
    </ContainerLayout>
  );
};

export default HowWeWork;
