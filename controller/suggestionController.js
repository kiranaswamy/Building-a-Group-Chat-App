exports.predictText = (req, res) => {
  const { text } = req.body;
  if (!text) return res.json({ suggestions: [] });

  const input = text.toLowerCase();

  const map = {
    "meet at": ["5 pm", "the office", "tomorrow"],
    "call you": ["later", "tomorrow", "soon"],
    "see you": ["soon", "tomorrow", "later"],
    "let us": ["know", "meet", "discuss"]
  };

  for (let key in map) {
    if (input.endsWith(key)) {
      return res.json({ suggestions: map[key] });
    }
  }

  res.json({ suggestions: [] });
};



exports.smartReplies = (req, res) => {
  const { message } = req.body;
  if (!message) return res.json({ replies: [] });

  const msg = message.toLowerCase();

  if (msg.includes("meeting")) {
    return res.json({
      replies: [
        "Yes, I’ll be there.",
        "Running late, will join soon.",
        "Can we reschedule?"
      ]
    });
  }

  if (msg.includes("where are you")) {
    return res.json({
      replies: ["On my way", "Running late", "Will be there soon"]
    });
  }

  res.json({
    replies: ["Okay", "Sure", "Let me check"]
  });
};
