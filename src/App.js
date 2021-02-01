import "./App.css";
import { useFetch } from "@fozg/one-point-sdk";
import { OP } from "./src/services/OP";
import Hightlight from "react-highlight.js";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const { data, loading, recall } = useFetch(() =>
    OP.getAppByName("code_pins").getListByName("pins").getItems()
  );

  useEffect(() => {
    if (data.length) {
      var grid = document.querySelector(".pinlists");
      new window.Masonry(grid, {
        itemSelector: ".pinItem",
        columnWidth: 620,
        horizontalOrder: true,
      });
    }
  }, [data]);

  return (
    <div style={styles.layout}>
      <div style={styles.left}>
        <AddZone onAdded={recall} />
      </div>
      {loading && (
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      )}
      <div style={styles.right}>
        <div style={styles.pinslist} className="pinlists">
          {data
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
            .map((pin) => (
              <div style={styles.card} className="pinItem" key={pin._id}>
                <div style={styles.title}>
                  <span>{pin.title}</span>
                  {pin.languages && (
                    <span style={styles.language}>{pin.languages?.name}</span>
                  )}
                </div>
                <Hightlight language="javascript">{pin.snippet}</Hightlight>
              </div>
            ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const AddZone = ({ onAdded }) => {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");

  const onSubmit = () => {
    if (!title.trim() || !snippet.trim()) {
      toast.error("Please enter content!");
      return;
    }
    OP.getAppByName("code_pins")
      .getListByName("pins")
      .addItem({
        title,
        snippet,
        language: "javascript",
      })
      .then((res) => {
        if (!res.isError) {
          toast.success("Added!");
          onAdded();
          setTitle("");
          setSnippet("");
        }
      });
  };
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        rows={20}
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
      ></textarea>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default App;

const styles = {
  layout: {
    height: "calc(100vh - 50px)",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
  },
  left: {
    width: 500,
    background: "#000",
    padding: 30,
  },
  pinslist: {
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap",
    padding: 30,
    // alignContent: "flex-start",
    width: "100%",
    // flex: 1,
  },
  right: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  card: {
    width: 600,
    float: "left",
    padding: "10px 0 0",
    background: "rgb(40 44 52)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    border: "1px solid #101010",
  },
  title: {
    fontSize: 14,
    color: "#eee",
    fontWeight: 500,
    padding: "0 10px 10px",
    borderBottom: "1px solid #111",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  language: {
    background: "#FFC107",
    color: "#000",
    fontWeight: 500,
    fontSize: 12,
    padding: "1px 5px",
    borderRadius: 20,
  },
};
