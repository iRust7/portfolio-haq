import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Img from "next/image";
import Layout from '../components/layout';
import Masonry from 'react-masonry-css';
import Typewriter from 'typewriter-effect';
import TypewriterCore from 'typewriter-effect/dist/core';
import { $, wait, show, fadeIn, fadeOut, disableScroll, enableScroll } from '../components/functions';
import Modal from '../components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Intro } from '../components/intro';
import { movePageScroll } from '../components/navigation';

export default function Index() {
  useEffect(() => {
    let overlay;
    let modal;
    let projectlinks = $('.projects-item a', true);
    projectlinks.forEach((projectlink) => {
      if (!projectlink.hash) return;
      projectlink.addEventListener('click', async (event) => {
        event.preventDefault();
        overlay = $(projectlink.hash + " .modal-overlay");
        overlay.style.display = 'block';
        overlay.style.height = document.body.scrollHeight.toString() + 'px';
        overlay.style.opacity = '1';
        modal = $(projectlink.hash + " .modal-container");
        modal.style.top = window.scrollY.toFixed(1).toString() + 'px';
        await wait(300);
        modal.style.opacity = '1';
        modal.style.transform = "translateY(0)";
        disableScroll();
      });
    });

    let closeModalLinks = $('.modal-dismiss', true);
    closeModalLinks.forEach((closeModalLink) => {
      closeModalLink.addEventListener('click', async (event) => {
        event.preventDefault();
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
        modal.style.transform = "translateY(-100%)";
        await wait(300);
        overlay.style.display = 'none';
        modal.style.top = '0';
        enableScroll();
      });
    });

    let modals = $('.modal', true);
    modals.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    let projectVisitLinks = $('.modal-visit', true);
    projectVisitLinks.forEach((projectVisitLink) => {
      projectVisitLink.addEventListener('click', () => {
        var win = window.open(projectVisitLink.href, '_blank');
        win.focus();
      });
    });

    if (movePageScroll.move) {
      window.scrollTo({
        left: 0,
        top: $(movePageScroll.to).offsetTop,
        behavior: "smooth"
      });
      movePageScroll.move = false;
    }

    setTimeout(() => {
      Intro();
    }, 500);
  }, []);
  return (
    <Layout>
      <section id="intro" style={{ background: '#000000' }}>
        <div id="intro-overlay" style={{ background: '#000000' }}></div>
        <div className="intro-content">
          <div className="row">
            <h2 className="fade-out"><Typewriter onInit={(typewriter) => {
              typewriter.pauseFor(350)
              .changeDelay(100)
              .typeString('Anything is possible<br>if you have got enough nerve.')
              .callFunction(() => {
                $('.intro-content h2').classList.add("active");
              }).start();
            }} options={{ cursor: '' }} /></h2>
            <h5 style={{ display: 'none' }}><Typewriter /></h5>
            <div id="intro-title" style={{ display: 'none' }} className='fade-in'>
              <h1>I am Haq.</h1>
            </div>
            <div id="intro-position" style={{ display: 'none' }} className='fade-in'>
              <p>
                <span>Front-End / Game Developer</span>
              </p>
            </div>
          </div>
          <div id="scroll-down" className="arrow-down fade-in" style={{ display: 'none' }}>
            <a href="#about" className="page-scroll"><FontAwesomeIcon icon={faAnglesDown} /></a>
          </div>
        </div>
        <ul className="intro-social">
          <div id="github" className='fade-in'>
            <li><a href="https://github.com/iRust7"><FontAwesomeIcon icon={faGithub} /></a></li>
          </div>
          <div id="youtube" className='fade-in'>
            <li><a href="https://m.youtube.com/channel/UC3Xv51fxOYfhnMWD9KMFhfA"><FontAwesomeIcon icon={faYoutube} /></a></li>
          </div>
          <div id="twitter" className='fade-in'>
            <li><a href="https://twitter.com/RustMoriarty"><FontAwesomeIcon icon={faTwitter} /></a></li>
          </div>
        </ul>
      </section>

      <section id="about">
        <div className="row section-intro">
          <div className="col-twelve">
            <h5>About</h5>
            <h1>HI, there! 👋</h1>
            <div className="intro-info">
              <div className="lead">
                <span>I am a </span><Typewriter onInit={(typewriter) => {
                  typewriter.pauseFor(100)
                  .changeDelay(125)
                  .typeString('developer')
                  .pauseFor(3500)
                  .deleteAll(75)
                  .typeString('')
                  .pauseFor(3500)
                  .start();
                }} options={{
                  cursor: '',
                  autoStart: true,
                  loop: true
                }} /><span> who dreams and pursues the future.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row about-content">
          <div className="col-six tab-full profile">
            <h3>Profile</h3>
            <ul className="info-list">
              <li>
                <strong>NickName:</strong>
                <span>Moh Nurul haq, NurHaq, FuseFox, RustFox</span>
              </li>
              <li>
                <strong>NPM:</strong>
                <span>23670138</span>
              </li>
              <li>
                <strong>Portfolio:</strong>
                <span><a href='https://fusefox-haqdb.vercel.app/'>fusefox-haqdb</a></span>
              </li>
              <li>
                <strong>Email:</strong>
                <span>mnurhaq2020@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="col-six tab-full skills">
            <h3>Skills</h3>
            <ul className="skill-bars">
              <li>
                <div className="progress percent85"><span>85%</span></div>
                <strong>HTML / CSS</strong>
              </li>
              <li>
                <div className="progress percent70"><span>70%</span></div>
                <strong>JavaScript</strong>
              </li>
              <li>
                <div className="progress percent75"><span>75%</span></div>
                <strong>C#</strong>
              </li>
              <li>
                <div className="progress percent50"><span>50%</span></div>
                <strong>PYTHON</strong>
              </li>
              <li>
                <div className="progress percent40"><span>40%</span></div>
                <strong>C++</strong>
              </li>
            </ul>
          </div>
        </div>
        <div className="row button-section">
          <div className="col-twelve">
            <Link href="/contact" passHref><a className="button stroke">Contact Me</a></Link>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="row section-intro">
          <div className="col-twelve">
            <h5>Projects</h5>
            <h1>Check Out Some of My Works.</h1>
          </div>
        </div>
        <div className="row projects-content">
          <div className="col-twelve">
            <Masonry breakpointCols={2} className="projects-wrapper" columnClassName="projects-item-wrap">
              <div className="projects-item">
                <Img src="/images/web/db.jpg" width={1440} height={758} onLoadingComplete={() => document.querySelectorAll('.projects-item .loading')[0].remove()} alt="Database" />
                <div className="loading" />
                <a href="#haq-db" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Database</h3>
                      <span className="projects-types">Web Development</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
                <Img src="/images/fable/main.jpg" width={1440} height={900} onLoadingComplete={() => {
  const loadingElement = document.querySelectorAll('.projects-item .loading')[1];
  if (loadingElement) {
    loadingElement.remove();
  }
}} alt="FableTales" />
                <div className="loading" />
                <a href="#fable" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Fable Tales</h3>
                      <span className="projects-types">python</span>
                    </div>
                  </div>
                </a>
              </div>
              <div className="projects-item">
              <Img src="/images/shlock/main.png" width={1440} height={838} onLoadingComplete={() => {
  const loadingElement = document.querySelector('.projects-item .loading');
  if (loadingElement) {
    loadingElement.remove();
  }
}} alt="Sherlock" />
                <div className="loading" />
                <a href="#sherlock" className="overlay">
                  <div className="projects-item-table">
                    <div className="projects-item-cell">
                      <h3 className="projects-title">Sherlock Holmes</h3>
                      <span className="projects-types">MarketPlace</span>
                    </div>
                  </div>
                </a>
              </div>
            </Masonry>
          </div>
        </div>
      </section>

      <div id="haq-db">
        <Modal>
          <div className="media">
            <Img src="/images/web/dbweb.gif" width={1440} height={758} onLoadingComplete={() => document.querySelector('#haq-db .loading').remove()} alt="Database" />
            <div className="loading" />
          </div>
          <div className="description-box">
            <h4>Database</h4>
            <p>A website that collects all my works.</p>
            <div className="categories">Web Development</div>
          </div>
          <div className="link-box">
            <a href="https://fusefox-haqdb.vercel.app/" target="_blank" className="modal-visit">Visit WebSite</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>

      <div id="fable">
        <Modal>
          <div className="media">
            <Img src="/images/fable/rpg.gif" width={1440} height={900} onLoadingComplete={() => document.querySelector('#fable .loading').remove()} alt="Database" />
            <div className="loading" />
          </div>
          <div className="description-box">
            <h4>Fable Tales</h4>
            <p>Python GAME FABLE TALES Text-Based RPG ASCII</p>
            <div className="categories">Game Development</div>
          </div>
          <div className="link-box">
            <a href="https://github.com/iRust7/Python-Text-Based-RPG-ASCII" target="_blank" className="modal-visit">Play Now</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>

      <div id="sherlock">
        <Modal>
          <div className="media">
            <Img src="/images/shlock/web.gif" width={1440} height={900} onLoadingComplete={() => document.querySelector('#sherlock .loading').remove()} alt="Sherlock Holmes" />
            <div className="loading" />
          </div>
          <div className="description-box">
            <h4>Sherlock Holmes Strore</h4>
            <p>Online Store About Fan merch.</p>
            <div className="categories">Web Development</div>
          </div>
          <div className="link-box">
            <a href="https://desain-web-nh-sherlocksh-v1.vercel.app/" target="_blank" className="modal-visit">Visit Project</a>
            <a className="modal-dismiss">Close</a>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}