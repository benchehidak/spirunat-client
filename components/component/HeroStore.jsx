'use client';
import { SfButton } from '@storefront-ui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';


const displayDetails = [
  {
    
    image: "/assets/imgs/banner/popup-1.png",
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    buttonText: 'Discover now',
    reverse: false,
    backgroundColor: 'bg-primary-200',
    titleClass: 'md:typography-display-2',
    subtitleClass: 'md:typography-headline-6',
    descriptionClass: 'md:typography-text-lg',
  },

];

export default function Hero() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    setDesktop(window.innerWidth);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDesktop(window.innerWidth);
    });
  }, []);

    
  return (
    <section>
    {
      desktop > 768 ? (
    <div className={`mx-2 my-4 `}   >
      <div className="flex flex-col md:flex-row flex-wrap gap-6 h-[26rem] ">
    
      {displayDetails.map(
        ({ image, title, subtitle, description, buttonText, backgroundColor, reverse, titleClass, subtitleClass }) => (
          <div
            key={title}
            className={classNames(
              'relative flex md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full rounded-3xl overflow-hidden',
              backgroundColor,
            )}
            style={{ backgroundImage: `url(${image})`,
                backgroundSize: "inherit",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat",

             }}
          >
            {/* <div
              className="absolute w-full h-full z-[0] focus-visible:outline focus-visible:rounded-lg"
              aria-label={title}
              style={{ backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

             }}
            ></div> */}
            <div
              className={classNames('flex justify-between overflow-hidden grow', {
                'flex-row-reverse': reverse,
              })}
            >
              <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
                <p
                  className={classNames('uppercase typography-text-xs block font-bold tracking-widest', subtitleClass)}
                >
                  {subtitle}
                </p>
                <h2 className={classNames('mb-4 mt-2 font-bold typography-display-3', titleClass)}>{title}</h2>
                <p className="typography-text-base block mb-4">{description}</p>
                {/* <SfButton className="!bg-slate-100 text-primary-100">{buttonText}</SfButton> */}
                <button className='inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-slate-100 shadow hover:shadow-md active:shadow bg-primary-700 hover:bg-primary-800 active:bg-primary-900'>
                  {buttonText}
                </button>
              </div>
              {/* <img src={image} alt={title} className="w-5/12 self-end object-contain" /> */}
            </div>
          </div>
        ),
      )}
    </div>
    </div>
      ) : (
        <>
        <div className={`mx-2 my-4 `}  >
      <div className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px] ">
      {displayDetails.map(
        ({ image, title, subtitle, description, buttonText, backgroundColor, reverse, titleClass, subtitleClass }) => (
          <div
            key={title}
            className={classNames(
              'relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full rounded-3xl overflow-hidden',
              backgroundColor,
            )}
            style={{ backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

             }}
          >
            {/* <div
              className="absolute w-full h-full z-[0] focus-visible:outline focus-visible:rounded-lg"
              aria-label={title}
              style={{ backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",

             }}
            ></div> */}
            <div
              className={classNames('flex justify-between overflow-hidden grow', {
                'flex-row-reverse': reverse,
              })}
            >
              <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
                <p
                  className={classNames('uppercase typography-text-xs block font-bold tracking-widest', subtitleClass)}
                >
                  {subtitle}
                </p>
                <h2 className={classNames('mb-4 mt-2 font-bold typography-display-3', titleClass)}>{title}</h2>
                <p className="typography-text-base block mb-4 text-[#253D4E]">{description}</p>
                <SfButton className="!bg-black text-primary-100 " >{buttonText}</SfButton>
              </div>
              {/* <img src={image} alt={title} className="w-5/12 self-end object-contain" /> */}
            </div>
          </div>
        ),
      )}
    </div>
    </div>

        </>
      )
    }
    </section>
  );
}