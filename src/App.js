import "./App.css";
import { useFetch } from "@fozg/one-point-sdk";
import { OP } from "./src/services/OP";
import Hightlight from "react-highlight.js";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useClickOutside from "./hooks/useClickOutside";

function App() {
  const { data, loading, recall } = useFetch(() =>
    OP.getAppByName("code_pins").getListByName("pins").getItems()
  );
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (data.length) {
      var grid = document.querySelector(".pinlists");
      new window.Masonry(grid, {
        itemSelector: ".pinItem",
        columnWidth: 610,
        horizontalOrder: true,
      });
    }
  }, [data]);

  return (
    <div>
      {modal && (
        <AddZone
          onClose={() => {
            setModal(false);
          }}
          onAdded={() => {
            setModal(false);
            recall();
          }}
        />
      )}
      <div style={styles.right}>
        <div style={styles.pinslist} className="pinlists">
          <div className="pinItem" style={{ ...styles.card, padding: 0 }}>
            <button
              onClick={() => {
                setModal(true);
              }}
            >
              New pin
            </button>
          </div>
          {loading && (
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          )}
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
                <div style={{ margin: 10 }}>
                  <Hightlight language="javascript">{pin.snippet}</Hightlight>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const AddZone = ({ onAdded, onClose }) => {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const ref = useRef();

  useClickOutside(ref, () => onClose());

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
    <div style={styles.modal}>
      <div style={styles.modalWrapper} ref={ref}>
        <div style={styles.header}>New pin</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Description"
        />
        <textarea
          style={{ fontFamily: "monospace" }}
          placeholder="Your code"
          rows={20}
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        ></textarea>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;

const styles = {
  layout: {
    height: "calc(100vh - 50px)",
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
    width: 590,
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
    padding: "0 20px 10px",
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
  modal: {
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    background: "rgba(0,0,0,.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modalWrapper: {
    background: "rgb(22 22 22)",
    padding: 20,
    boxShadow: "0 5px 15px rgba(0,0,0,.1)",
    borderRadius: 15,
  },
  header: {
    fontSize: 16,
    color: "#fff",
    fontWeight: 500,
    marginBottom: 20,
  },
};
