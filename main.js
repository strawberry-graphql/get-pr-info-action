module.exports = async ({ github, context, core }) => {
  let pullRequest = null;

  const { payload, sha, eventName } = context;

  if (eventName === "pull_request" || eventName === "pull_request_target") {
    pullRequest = context.payload.pull_request;
  } else {
    const { repository } = payload;

    const result = await github.repos.listPullRequestsAssociatedWithCommit({
      owner: repository.owner.login,
      repo: repository.name,
      commit_sha: sha,
    });

    [pullRequest] = result.data;
  }

  if (!pullRequest) {
    core.setOutput("has-pr", false);

    console.log("no pull request found for this commit");
    return;
  }

  const contributor = pullRequest.user;
  const username = pullRequest.user.login;

  const { data: author } = await github.users.getByUsername({
    username,
  });

  console.log("pull request found, setting outputs");

  const name = author.name || author.login;
  const twitter_username = author.twitter_username
    ? author.twitter_username
    : "";

  core.setOutput("has-pr", true);
  core.setOutput("pr-number", pullRequest.number);
  core.setOutput("repository-name", pullRequest.base.repo.name);
  core.setOutput("contributor-name", name);
  core.setOutput("contributor-username", author.login);
  core.setOutput("contributor-twitter-username", twitter_username);
};
