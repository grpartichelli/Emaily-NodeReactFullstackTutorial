Survey.updateOne({
  id: surveyId,
  recipients: {
    $elemMatch: { email: email, responded: false },
  },
});
