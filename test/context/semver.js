const parseVersion = (version) => {
    const re = /v(\d+)\.(\d+)\.(\d+)/
    const [, ma, mi, p] = re.exec(version)
    const major = parseInt(ma, 10)
    const minor = parseInt(mi, 10)
    const patch = parseInt(p, 10)
    return { major, minor, patch}
}

const {
    major: nodeMajor,
    minor: nodeMinor,
    patch: nodePatch,
} = parseVersion(process.version)

const nodeLt = (version) => {
    const { major, minor, patch } = parseVersion(version)
    if (major === nodeMajor) {
        if (minor === nodeMinor) {
            return nodePatch < patch
        }
        return nodeMinor < minor
    }
    return nodeMajor < major
}

module.exports = {
    nodeLt,
}
