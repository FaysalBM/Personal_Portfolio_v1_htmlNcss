import React, {useRef, useMemo, Suspense, useEffect, useState} from "react";
import Spinner from 'react-spinner';
import { Section } from "./containers/sections/Section";
import * as THREE from 'three';

import "./App.css";

import { Navbar } from './components';
import { Skills, Blog } from './containers';

import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import {softShadows, Cloud, Stars, Text, OrbitControls, Effects as EffectsComposer, MeshReflectorMaterial, Html } from "@react-three/drei";
import MAINLOGO from "./assets/Logo_complete";
import EZAL from "./assets/_gltf";
import state from './containers/sections/state'
import { UnrealBloomPass } from 'three-stdlib';
import { RGB_PVRTC_4BPPV1_Format } from "three";

//Intersection observer
import{useInView} from "react-intersection-observer";


extend({ UnrealBloomPass });

softShadows();


{/*THE PARAMETERS I PASS THEM ON THE BOX FUNCTION  */}
const SpinningBox = ({position, args, color}) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y +=0.01) );
  return (
    <mesh castShadow position={position} ref = {mesh}>
    <boxBufferGeometry attach='geometry' args={args} />
    <meshStandardMaterial attach='material' color={color} />
  </mesh>
  )
}

const LOGOShadows = () => {
  return(
    <group>
    <mesh 
      receiveShadow
      rotation={[-Math.PI / 4, 0, 0]} position={[0,-3, 0]}>
      
      {/* V ---this are the shadows and the floor whrere the models stand --- V */}
      <shadowMaterial attach='material' opacity={0.3}  />
      <meshStandardMaterial attach='material' color='rgb(0,0,0)' opacity={0.3}/>
    </mesh>
  </group>
  
  );
}

export const Effects = () => {
  const { size, scene, camera } = useThree();
  const aspect = useMemo(
    () => new THREE.Vector2(size.width, size.height),
    [size]
  );

  return (
    <EffectsComposer
      multisamping={8}
      renderIndex={1}
      disableGamma
      disableRenderPass

    >
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.4, 1, 0]} />
    </EffectsComposer>
  );
};
const BiglogoLights = () => {
  return (<>
        <ambientLight intensity={0.3} />
        <directionalLight
            castShadow
        position={[0,5,110]} intesity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        />

        
        <pointLight position={[-4.5 ,0, 120]} intensity={0.5}/>
        <pointLight position={[0 ,0, 120]} intensity={1}/>
  
  
  </>
  );
}

const Mainpage  =({domContent}) => {
  return (
      <Section factor={1.5} offset={1}>
        <group position ={[0,250,0]} portal={domContent}>
            <LOGOShadows />
            <MAINLOGO position={[-3,0,110]} scale={0.8}/>
            <EZAL  position={[-3.7,0,115]} color='rgb(55, 44, 44)' scale={0.25}/>
        </group>

      </Section>
  );
}

const AboutMePage = ({domContent}) => {
    const [refItem, inView] = useInView({
        threshold: 0
    })
    useEffect(() => {
        inView && (document.body.style.background = '#121212')
    }, [inView])
  return (
      <Section factor={1.5} offset={1}>
          <group position ={[0,50,0]} portal={domContent}>
              <mesh>
                <MAINLOGO  colorF="red" colorA="red" position={[-20, 115, 95]} scale={2} />
                  {/*<Stars radius={90} depth={40} count={1200} factor={5} saturation={5} fade />*/}
                  <OrbitControls/>

              </mesh>

               {/*MAYBE LIGHTS AND STARS INSIDE MESH*/}
                
            <Html className="aboutMe" position={[3, 140, 95]}>
                <h1>
                  About Me
                </h1>
                <h3 >
                I'm Faysal Badaoui Mahdad, a 19 yo kiddo that was born and raised In Catalonia, Spain. Currently I'm a Computer Science student and a starter self-taught web developer. I hope you like this portfolio and don't hesitate to contact me for anything!
                </h3>


                <h1 className='skillTitle'>
                    Skills
                </h1>
                <h3 className='skillsText'>
                </h3>
                <h1 className='cmTitle'>
                    Contact Me
                </h1>
                <h3 >

                </h3>

                <div ref={refItem}/>
            </Html>
          </group>
      </Section>
  );
}

const SkillsPage =({domContent}) => {
  return(
    <Section factor={1.5} offset={1}>
      <group position={[0,0,0]}>
          <mesh />


          <Html className="skillsGraph" portal={domContent} position={[-30,138,90]} >
              <section className="skills">
                  <div className="row">
                      <div className="item">
                          <div className="item-text">
                              <span>Cinema 4D</span>
                              <span className="w-90">90%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-90"></div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="item-text">
                              <span>Photosh
                                  op</span>
                              <span className="w-90">90%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-90"></div>
                          </div>
                      </div>

                      <div className="item">
                          <div className="item-text">
                              <span>C / C++</span>
                              <span className="w-75">75%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-75"></div>
                          </div>
                      </div>

                      <div className="item">
                          <div className="item-text">
                              <span>HTML5</span>
                              <span className="w-85">85%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-85"/>
                          </div>
                      </div>

                      <div className="item">
                          <div className="item-text">
                              <span>CSS3</span>
                              <span className="w-80">80%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-80"/>
                          </div>
                      </div>

                      <div className="item">
                          <div className="item-text">
                              <span>Java</span>
                              <span className="w-60">95%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-60"/>
                          </div>
                      </div>

                      <div className="item">
                          <div className="item-text">
                              <span>React</span>
                              <span className="w-68">68%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-68"/>
                          </div>
                      </div>
                      <div className="item">
                          <div className="item-text">
                              <span>SQL</span>
                              <span className="w-65">65%</span>
                          </div>
                          <div className="progress">
                              <div className="progress-bar w-65"/>
                          </div>
                      </div>
                  </div>
              </section>





          </Html>
        <Html className="contactMeStuff" portal={domContent} position={[-40,80,90]} >

            <section className="stuffCm">
                <div className="buttons">
                    <div className="row" >
                        <a href="https://www.linkedin.com/in/faysal-badaoui-8b760b198/" target="_blank" rel="noopener noreferrer">
                            <button onClick={"http://www.google.com"} className="facebook"  >
                                <span><i className="fab fa-linkedin"/></span>
                                LinkedIn
                            </button>
                        </a>

                        <a href="https://github.com/FaysalBM" target="_blank" rel="noopener noreferrer">
                            <button className="instagram">
                                <span><i className="fab fa-github"/></span>
                                Github
                            </button>
                        </a>
                    </div>
                    <div className="row">
                        <a href="https://twitter.com/Faysal2_" target="_blank" rel="noopener noreferrer">
                            <button className="twitter">
                                <span><i className="fab fa-twitter"/></span>
                                Twitter
                            </button>
                        </a>
                        <a href="mailto:faysalbadaouimahdad@gmail.com" target="_blank" rel="noopener noreferrer">
                            <button className="youtube">
                                <span>@</span>
                                Gmail
                            </button>
                        </a>

                    </div>
                </div>



            </section>




        </Html>
          <Html className="copyright" portal={domContent} position={[-40,0,90]} >

              <h1 className="frase">
                    "Somewhere, something incredible Is waiting to be known" - Carl Sagan
              </h1>
              <h1 className="copy">©  2022 Faysal Badaoui Mahdad. All rights reserved.</h1>
              <h1 className="update">   v. 1.0.0 - Last update: 10 March 2022, 19:43.</h1>
          </Html>
      </group>
    </Section>
  );
}



function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <Suspense fallback={<Spinner/>}>
      <Canvas shadows colorManagement camera={{position: [0, 0, 120], fov: 70}}>
        <BiglogoLights/>
        {/* LIGHTS WITH THEIRS PARAMETERS */}
        <Mainpage domContent={domContent}/>
        <AboutMePage domContent={domContent}/>
        <SkillsPage domContent={domContent} />

          
      </Canvas>


      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </Suspense>
  );
}

export default App;
