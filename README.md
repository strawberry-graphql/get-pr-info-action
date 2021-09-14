# Get PR info action

This GitHub action allows to get information about a PR. It also works when
merging a PR into the main branch.

We use this action to send a tweet containing the PR's contributor name.

## Inputs

This action requires no inputs. But it needs the GitHub access token to
be able to get information about the PR and the contributor.

## Outputs

- `has-pr`: Wether this commit has a PR associated with it or not
- `pr-number`: The PR number
- `contributor-name`: The name of the contributor, it falls back to the contributor's username if the name is not set.
- `contributor-username`: The username of the contributor.
- `repository-name` : The name of the base repository

## Example usage

```yml
name: Get PR info

on:
  pull_request:

jobs:
  get-contributor-info:
    name: Get PR info
    runs-on: ubuntu-latest

    outputs:
      contributor-name: ${{ steps.get-info.outputs.contributor-name }}
      contributor-username: ${{ steps.get-info.outputs.contributor-username }}

    steps:
      - uses: actions/checkout@v2
      - name: Get PR info
        id: get-info
        uses: strawberry-graphql/get-pr-info-action@v1
        env:
          ACCESS_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
