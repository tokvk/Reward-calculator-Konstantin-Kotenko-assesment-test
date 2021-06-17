
/* 
Author: Konstantin Kotenko
Date: 06/17/2021

Comment: Since the requirements were focusing more on math operation with external data, I created a local json file with mock
user accounts and transaction activities for 3 months (Jan, Feb, Mar) rel path: (database\data.json). 
In this app / component I decided not to focus on events and not to manipulate DOM, (I already have a separate project that utilizes complex 
DOM manipulation, with event handlers, synthetic events, etc.)

When component did mount data called and set as state, and rendered to dom based on the required logic.
App accepts only numeric data in the transactions portion of json file (money amounts with two decimal places). 
If invalid data is detected in json file, the error message will be logged in to the console. 
If database grows app responds gracefully and adds new users / profiles to the calculation as long as the structure of json file remains the same.

Style: I used a template from a previous project with bootstrap plugged in. 

Note: In the Transaction columns each transaction amount separated by comma.
In order to implement table layout in HTML as fast as possible I used an excellent tool: https://www.tablesgenerator.com/html_tables#
*/  
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("database/data.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
          console.log("ERROR has occurred in json data file, please check if data that is entered meets the requirements");
        }
      )
  }
 
  render() {
    return (
      <div>
        <div class="app-container container row m-auto ">
        <p class="text-center">Reward points calculator <br /> assessment test.</p>
          <div class="mt-3">
            <div class="tg-wrap">
              <table class="tg m-auto mb-5 ">
                <thead>
                  <tr>
                    <th class="tg-c3ow" colspan="2">Customer</th>
                    <th class="tg-c3ow" colspan="6">Transactions (comma separated) <br /> Reward points<br />per month </th>
                    <th class="tg-c3ow" rowspan="3"> Reward <br /> points <br /> accumulated<br />in <br /> Three months <br /> Total</th>
                  </tr>
                  <tr>
                    <td class="tg-c3ow" rowspan="2">ID</td>
                    <td class="tg-c3ow" rowspan="2">Full Name</td>
                    <td class="tg-c3ow" colspan="2">January </td>
                    <td class="tg-c3ow" colspan="2">February </td>
                    <td class="tg-c3ow" colspan="2">March </td>
                  </tr>
                  <tr>
                    <td class="tg-0pky">Transactions</td>
                    <td class="tg-0pky">Reward</td>
                    <td class="tg-0pky">Transactions</td>
                    <td class="tg-0pky">Reward</td>
                    <td class="tg-0pky">Transactions </td>
                    <td class="tg-0pky">Reward</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((customerProfile, index) => {
                    const tpm = Object.values(customerProfile.transactionsByMonth); //object to array
                    let month = {
                      jan: 0,
                      feb: 1,
                      mar: 2,
                    };
                    let rewardArr = [];
                    tpm.map((arr, index) => {
                      let rpm = [];
                      arr.map((item, index) => {
                        if (item < 51) {
                          rpm.push(0)
                        } else if (item >= 51 && item < 101) {
                          rpm.push(Math.floor(item) - 50)
                        } else if (item >= 101) {
                          rpm.push((Math.floor(item) - 100) * 2 + 50)
                        }
                      })
                      rewardArr.push(rpm.reduce((a, b) => a + b))
                    })
                    return (
                      <tr>
                        <td class="tg-c3ow">{customerProfile.customerID}</td>
                        <td class="tg-c3ow">{customerProfile.fullName}</td>
                        <td class="tg-0pky">{tpm[month.jan].join(", ")}</td>
                        <td class="tg-c3ow">{rewardArr[month.jan]}</td>
                        <td class="tg-0pky">{tpm[month.feb].join(", ")}</td>
                        <td class="tg-c3ow">{rewardArr[month.feb]}</td>
                        <td class="tg-0pky">{tpm[month.mar].join(", ")}</td>
                        <td class="tg-c3ow">{rewardArr[month.mar]}</td>
                        <td class="tg-c3ow">{rewardArr.reduce((a, b) => a + b)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div class="text-center m-auto">
        Designed and Coded by <br />
        <a
          class="text-warning"
          href="https://github.com/tokvk"
          target="_blank"
          title="Konstantin's GitHub page"
        >
          Konstantin Kotenko.
        </a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

