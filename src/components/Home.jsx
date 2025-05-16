import '../styles/Home.css'
import HomeData from "../../HomeData.json"

export default function Home() {



  return (
    <>
      <main>
        <div className="sub-main">
          <div className="home-conatiner">
            <div className="title">
              <h1>Cross Site Scripting-Attack</h1>
              <p className='main-p'>Identify Attack By <span className='movementtext'> Cyber Ai</span></p>
            </div>
            <img src="/Images/img.png" alt="Loading.." />
          </div>
        </div>

        <div className="about-Attack">

          <h1>🔐 Common Web Vulnerabilities</h1>
          <div className="context-attack">
            <div className="attack-1">
              <h1>XSS (Cross-Site Scripting) Attack</h1>
              <p>Cross-Site Scripting (XSS) is a vulnerability found in web applications where attackers inject malicious scripts into trusted websites. When unsuspecting users visit the infected page, the script runs in their browser — potentially exposing sensitive data such as cookies, session tokens, or login details.
                XSS targets the user's trust in a website, leading to data theft, session hijacking, or defacement.</p>
            </div>

            <div className='diffline'></div>

            <div className="attack-2">
              <h1>SQL Injection (SQLi) Attack</h1>
              <p>SQL Injection is a critical vulnerability that occurs when an attacker inserts malicious SQL queries into user input fields — such as login forms or search bars. If the input is not properly sanitized, it can directly interact with the database.
                This can allow attackers to bypass authentication, read sensitive data, delete records, or even take full control of the database.</p>
            </div>
          </div>

        </div>

        <div className='prevent-box'>
          <div className='prevent-content'>
            <h1>How We Secure Your Inputs?</h1>
            <ul class="protection-list">
              <li>
                <strong>Layer 1: Trie-Based Detection</strong><br />
                Scans input for known attack signatures like SQLi or XSS using pattern matching. Fast and lightweight.
              </li>
              <li>
                <strong>Layer 2: Grammar-Based FSM Validation</strong><br />
                Validates SQL and JavaScript input structure using Finite State Machines to detect malformed or suspicious logic.
              </li>
              <li>
                <strong>Layer 3: ML Heuristic Classifier</strong><br />
                Uses machine learning with features like entropy, token frequency, and structure to detect complex or obfuscated attacks.
              </li>
            </ul>
          </div>
        </div>


        <div className="user-card">

          <div className="user-content">
            <h1>Meet the Contributors</h1>
            <div className="card-box">
              {
                HomeData.map((data, i) => {
                  return (
                    <div className="card">
                      <img src={data.imgURL} alt="img_load" />
                      <div className="data-box">
                        <div className='abt-box'>{data.Name}</div>
                        <div className='abt-box'>{data.University}</div>
                        <div className='abt-box'>Section: {data.Section}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
