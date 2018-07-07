export default {
    methods: {
        isInDict(word) {
            if (!hash)
            {
                hash = location.hash
            }
            return hash.replace('#:', '')
        }
    }
}