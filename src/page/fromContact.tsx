const FormContact = () => {
  return (
    <div>
      <h1>Trang liên hệ</h1>
      <div className="container">
        <div className="contact-form">
          <h1 style={{ textAlign: "center" }}>Liên Hệ với Chúng tôi:</h1>
          <form action="submit_form.php" method="post">
            <p className="tittle">
              <i className="fa fa-location-arrow" aria-hidden="true" /> 77 Lê Trung Nghĩa, Phường 12, đường An Bình, Quận Tân Bình, TP.HCM
            </p>
            <p className="tittle">
              <i className="fa fa-phone" aria-hidden="true" /> 0962345892
            </p>
            <p className="tittle">
              <i className="fa fa-envelope" aria-hidden="true" /> EYYO@gmail.com
            </p>
          </form>
          <form action="submit_form.php" method="post">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Họ và tên"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <textarea
              id="message"
              name="message"
              placeholder="Nội dung tin nhắn"
              required
              defaultValue={""}
            />
            <button type="submit">Gửi</button>
          </form>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.129625293334!2d106.6990183152608!3d10.776889092313494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c11455aa5b%3A0x577e8d36fb6a40e5!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1615361635406!5m2!1sen!2s"
            width={600}
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default FormContact;
