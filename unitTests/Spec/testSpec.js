// require('jasmine-ajax')
// testing of the fetch requests using fake spyOn is not included

describe('A function "findUser" that fetches a github user...', function () {
  beforeEach(function () {
    spyOn(window, 'errorHandler')
  })
  it('should exist', function () {
    expect(findUser).toBeDefined()
  })
  it('should call "errorHandler" function if empty field is submitted', function () {
    window.findUser('')
    expect(window.errorHandler).toHaveBeenCalledWith('')
  })
})

describe('A function "findUserBio" that gets the github user\'s info..', function () {
  it('should exist', function () {
    expect(findUserBio).toBeDefined()
  })
    // it('should receive a non-empty object containing user data..', function () {
    //   expect(arguments[0] instanceof Object).toBeTruthy()
    //   let enumerables = Object.keys(arguments[0]).length
    //   expect(enumerables).toBeGreaterThan(0)
    // })
})

describe('A function "renderUserInfo" that renders user\'s info in DOM..', function () {
  it('should exist', function () {
    expect(renderUserInfo).not.toBeUndefined()
  })
})

describe('A function "findUserRepos" that fetches the list of user repos..', function () {
  it('should exist', function () {
    expect(findUserRepos).toBeDefined()
  })
})

describe('A function "renderRepos" that receives the list of user repos...', function () {
  it('should exist', function () {
    expect(renderRepos).toBeDefined()
  })
  // it('should receive an array of objects or an empty array (if no repos)', function () {
  //   expect(arguments[0] instanceof Array).toBeTruthy()
  // })
})

describe('A function "renderAllRepos" that renders the list of repos in DOM..', function () {
  it('should exist', function () {
    expect(renderAllRepos).toBeDefined()
  })
  // it('should receive a non-empty array', function () {
  //   expect(arguments[0].length).toBeGreaterThan(0)
  // })
  it('should return a HTML template string', function () {
    let sTemplate = renderAllRepos([{}])
    expect(typeof sTemplate).toEqual('string')
  })
})

describe('A function "errorHandler" that handles error..', function () {
  it('should exist', function () {
    expect(errorHandler).toBeDefined()
  })
})
