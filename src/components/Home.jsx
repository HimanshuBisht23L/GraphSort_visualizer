import '../styles/Home.css'
import HomeData from "../../HomeData.json"

export default function Home() {



  return (
    <>
      <main>
        <div className="sub-main">
          <div className="home-conatiner">
            <div className="title">
              <h1>Learn Through Visuzlize</h1>
              <p className='main-p'>Easy to Learn  <span className='movementtext'> Graphs/Sorting </span></p>
            </div>
            <img src="/Images/img.png" alt="Loading.." />
          </div>
        </div>

        <div className="about-Attack">

          <h1>Visualizing Works?</h1>
          <div className="context-attack">
            <div className="attack-1">
              <h1>Graph's Visualising</h1>
              <p>A Graph Visualizer provides a graphical interface to create and explore graphs composed of nodes (vertices) and edges. It allows users to interactively add nodes, connect them, and run algorithms like Depth-First Search (DFS), Breadth-First Search (BFS), or Dijkstra’s shortest path. These visual tools are valuable for understanding how graph algorithms traverse or analyze network structures in real time, enhancing learning through clear, dynamic representation.</p>
            </div>

            <div className='diffline'></div>

            <div className="attack-2">
              <h1>Sorting Visualising</h1>
              <p>
                A Sorting Visualizer is an interactive tool designed to visually demonstrate how various sorting algorithms work, such as Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort. By animating the step-by-step comparisons, swaps, and placements of elements, it helps users intuitively understand the inner mechanics of each algorithm. It’s especially useful for students and developers who want to grasp time and space complexity through visual learning.</p>
            </div>
          </div>

        </div>

        <div className='prevent-box'>
          <div className='prevent-content'>
            <h1>How We Do Visualize?</h1>
            <ul class="protection-list">
              <li>
                <strong>Task 1: Graph Visualizer</strong><br />
                Enables users to create vertices and connect edges in a user-friendly environment, then apply graph algorithms (such as DFS, BFS) to understand graph traversal concepts.
              </li>
              <li>
                <strong>Task 2: Sorting Visualizer</strong><br />
                Provides an interactive interface where users can visualize how different sorting algorithms (like Bubble Sort, Merge Sort, Quick Sort, etc.) operate step-by-step, helping to build intuition about time complexity and algorithm behavior.
              </li>
              <li>
                <strong>Task 3: Step-by-Step Visualizing</strong><br />
                Displays algorithm operations in a sequential, animated manner to clearly illustrate each step in the process, making it easier for users to follow and understand algorithm logic and flow.
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
