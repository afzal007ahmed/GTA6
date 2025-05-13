import { useEffect, useRef } from 'react';
import './App.css'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'

function App() {

  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dataSpecs = [
    {
      title: 'Ram',
      value: '32 GB'
    },
    {
      title: 'CPU',
      value: 'Intel Core i9-10900K/AMD Ryzen 5 5900X'
    },
    {
      title: 'OS',
      value: 'Windows 11 64-bit'
    },
    {
      title: 'GPU',
      value: 'Nvidia Geforce RTX 3080/AMD Radeon RX 6800XT'
    },
    {
      title: 'Storage',
      value: '150GB NVMe SSD'
    }
  ]
  const dataRef = useRef(new Array(5).fill(null));
  useEffect(() => {
    if (videoRef.current) {
      const status = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch((e) => console.log(' failed', e));
          }
          else {
            videoRef.current?.pause();
          }
        })
      }, {
        threshold: 0.5
      })
      if (videoRef.current) {
        status.observe(videoRef.current);
      }
    }
  }, [videoRef.current])
  useEffect(() => {
    if (dataRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.timeline().fromTo(entry.target, {
              duration: 2,
              ease: 'power1.inOut',
              scale: 1.2
            }, {
              duration: 1.5,
              scale: 1,
              ease: 'power1.inOut'
            }
            )
          }
        })
      }, {
        threshold: 0,
      })
      dataRef.current.forEach((item) => observer.observe(item));

    }
  }, [dataRef.current])
  useGSAP(() => {
    const gsapval = gsap.timeline();


    gsapval.fromTo(
      ref.current,
      {
        scale: 5
      },        // Start big
      {
        scale: 2,          // End at normal size
        duration: 2,
        rotation: 360,
        ease: 'power2.inOut',
      }
    );
    gsapval.to(ref.current, {
      scale: 5,
      duration: 2,
      opacity: 0,
      ease: 'power1.out'
    })
    gsapval.to(ref2.current, {
      opacity: 1,
      duration: 1
    })
    gsapval.to(ref2.current, {
      opacity: 0
    })
    gsapval.to(ref3.current, {
      opacity: 1
    })
    gsapval.to(ref4.current, {
      opacity: 1,
      scale: 1
    })
    gsapval.to(ref5.current, {
      opacity: 1
    })
  }, []);
  return (
    <div>
      <div className='overflow-hidden relative'>
        <div className='top-0 text-white text-3xl p-4 fixed z-1'>
          Rockstar
        </div>
        <img src='sky.png' className='w-[100vw] h-[100vh] object-fit absolute top-0 -z-1' />
        <img src='bg.png' className='w-[100vw] h-[100vh] object-fit' />
        <div className='text-white absolute top-0 text-[150px] w-full items-center flex-col opacity-0 flex' ref={ref3}>
          <div className='w-[600px]'>grand</div>
          <div className='w-[600px] text-end -mt-12'>theft</div>
          <div className='w-[600px] -mt-20'>auto</div>
        </div>
        <div className='absolute top-80  justify-center w-full -ml-12 opacity-0 flex scale-[1.5]' ref={ref4}>
          <img src='girlbg.png' />
          <img src='logo18.png' className='w-[100px] h-[150px] mt-72 -ml-44' />
        </div>
        <div className='main-div absolute bottom-0 w-full h-full flex items-end justify-center opacity-0' ref={ref5}>
          <img src='ps5.png' className='w-[300px]' />
        </div>
        <svg width="100vw" height="100vh" className='absolute top-0' ref={ref}>
          <mask id="cutout-text-mask">
            <rect width="100vw" height="100vh" fill="white" />
            <text fontSize="400" fill="black" x='40vw' y='62vh' fontFamily='pricedown'>VI</text>
          </mask>
          <rect width='100vw' height='100vh' fill='black' mask='url(#cutout-text-mask)' />
        </svg>
        <div className='absolute top-0 h-full w-full bg-black opacity-0' ref={ref2}>
        </div>
      </div>
      <div className='w-[100vw] h-[100vh] bg-black flex'>
        <div className='w-[40%] flex items-center justify-center'>
          <img src='imag.png' />
        </div>
        <div className='w-[50%] text-white'>
          <div className='text-[50px] justify-center h-[25%] flex items-end'>Game Trailer</div>
          <div>
            <video src='trailer.mp4' controls muted className='w-[100%] mt-6' ref={videoRef}>
              Video is not supported by your browser
            </video>
          </div>
        </div>
      </div>
      <div className='h-[100vh]'>
        <div className='text-center text-[100px] text-orange-400'>System Requirements</div>
        <div className='flex justify-center mt-12'>
          <table>
            <tbody>
              {
                dataSpecs.map((item, index) =>
                  <tr className='border-4 border-double flex gap-12 p-2 text-[50px] bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-md text-white mb-4' ref={(el) => { dataRef.current[index] = el }}>
                    <td className='w-[200px]'>{item.title} </td>
                    <td>{item.value}</td>
                  </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
