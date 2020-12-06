import React from "react";

import history from "../JS/history";
import im from "../static/photos/BackgroundMapImage.jpg";

class EndPage extends React.Component {
  constructor(props) {
    super(props);
    this.buttonText = "test";
  }

  clicked() {
    history.push("/location");
  }

  render() {
    return (
      <div className="mainDiv endPage">
        <div className="locationName">נתראה בצילומים</div>

        <div className="">
          <div>
            <img src={im} />
          </div>
          <div className="vase">@%Park kiahon</div>
        </div>
        <div className="endPageDate">
          <div className="endPageDateHeader"> יום @שבת @30 ל@נובמבר</div>
          <div>שעה @15:00-16:00</div>
        </div>
        <div className="endPageRecomendations">
          <div style={{ textAlign: "right" }}>
            לבוש מותאם בצבאעים ואחיד, להשתדל לא ללבוש בגדים עם טקסטורות ופסים
          </div>
          <div style={{ textAlign: "right" }}>
            כדאי להביא אקססוריז מגניבים כמו כובעים, פרחים ועוד..
          </div>
        </div>
        <div className="endPageWatsap">
          <div>להמלצות ביגוד זמינה בוואצאפ</div>
          <div>קטי 0524550656</div>
        </div>
      </div>
    );
  }
}

export default EndPage;
