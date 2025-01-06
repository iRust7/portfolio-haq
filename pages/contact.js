import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '../components/layout';
import { $, fadeIn, fadeOut } from '../components/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  const form = useRef();

  useEffect(() => {
    document.querySelector('html').style.background = '#151515';
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    let pass = [false, false, false, false, false];
    $('.error-label', true).forEach((label) => {
      label.innerHTML = '';
    });

    // Validasi form
    document.getElementsByName('title').forEach((input) => {
      if (!input.value) {
        pass[0] = false;
        $('.error-label', true)[0].innerHTML = "<label class='error'>Please Enter a Title.</label>";
      } else {
        pass[0] = true;
      }
    });
    document.getElementsByName('name').forEach((input) => {
      if (!input.value) {
        pass[1] = false;
        $('.error-label', true)[1].innerHTML = "<label class='error'>Please Enter Your Name.</label>";
      } else {
        pass[1] = true;
      }
    });
    document.getElementsByName('email').forEach((input) => {
      if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        pass[2] = false;
        $('.error-label', true)[2].innerHTML = "<label class='error'>Please Enter a Valid Email.</label>";
      } else {
        pass[2] = true;
      }
    });
    document.getElementsByName('message').forEach((input) => {
      if (!input.value) {
        pass[3] = false;
        $('.error-label', true)[3].innerHTML = "<label class='error'>Please Enter a Message.</label>";
      } else {
        pass[3] = true;
      }
    });
    if ($('#g-recaptcha-response').value === null || $('#g-recaptcha-response').value === '') {
      pass[4] = false;
      $('.error-label', true)[4].innerHTML = "<label class='error'>Please Proceed With reCAPTCHA Certification.</label>";
    } else {
      pass[4] = true;
    }

    // Jika semua validasi lolos
    if (pass.every((value) => value)) {
      $('.error-label', true).forEach((label) => {
        label.remove();
      });
      let loader = $('#submit-loader');
      fadeIn(loader);

      emailjs
        .sendForm('service_nurhaq27', 'template_fusefox', form.current, 'DMCky05jUTZMDPAJl')
        .then(
          (response) => {
            fadeOut(loader);
            $('#message-warning').style.display = 'none';
            $('#contact-form').style.display = 'none';
            $('#message-success').innerHTML =
              "<i class='fa fa-check'></i>The message was sent successfully. The answer will be sent to the email address you filled out.";
            fadeIn($('#message-success'));
          },
          (error) => {
            fadeOut(loader);
            $('#message-warning').innerHTML =
              "<i class='fa fa-times'></i>Failed to send message. Please try again in a few minutes.<br>" +
              error.text;
            fadeIn($('#message-warning'));
          }
        );
    }
  };

  return (
    <Layout>
      <div>
        <section id="contact">
          <div className="row contact-content">
            <div className="col-twelve">
              <h5>Contact</h5>
              <h1>I'd Love To Hear From You.</h1>
              <form ref={form} id="contact-form" name="contact-form" className="contact-form" onSubmit={sendEmail}>
                <div className="form-field">
                  <input type="text" name="title" className="form-control" placeholder="Title" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <input type="text" name="name" className="form-control" placeholder="Name" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <input type="text" name="email" className="form-control" placeholder="Email" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <textarea name="message" className="form-control" placeholder="Message"></textarea>
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <ReCAPTCHA className="g-recaptcha" sitekey="6Ld52K8qAAAAAJx9oer5neo9l7nQAFZS_OyKyiL6" />
                  <div className="error-label"></div>
                </div>
                <div className="form-field">
                  <input type="submit" name="submit" className="submit" value="Submit" />
                </div>
                <div id="submit-loader">
                  <div className="text-loader">Sending...</div>
                  <div className="s-loader">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                  </div>
                </div>
              </form>
              <div id="message-success"></div>
              <div id="message-warning"></div>
            </div>
          </div>
        </section>

        <footer id="copyright">
          <div className="row">
            <div className="col-six tab-full">
              <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Ffusefox-haqdb.vercel.app&count_bg=%233673D9&title_bg=%23000000&icon=powershell.svg&icon_color=%23FFFFFF&title=Hits&edge_flat=true" />
              <p className="fl_left text">Nur Haq &copy; 2024. All Rights Reserved.</p>
            </div>
            <div className="col-six tab-full pull-right social">
              <ul className="footer-social">
                <li><a href="https://github.com/iRust7"><FontAwesomeIcon icon={faGithub} /></a></li>
                <li><a href="https://m.youtube.com/channel/UC3Xv51fxOYfhnMWD9KMFhfA"><FontAwesomeIcon icon={faYoutube} /></a></li>
                <li><a href="https://twitter.com/RustMoriarty"><FontAwesomeIcon icon={faTwitter} /></a></li>
              </ul>
              {/* <button id="donate">
                <a href="">
                  <span aria-label="coffee"><FontAwesomeIcon icon={faMugHot} /></span>
                  <span>Give Me a Coffee</span>
                </a>
              </button> */}
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
