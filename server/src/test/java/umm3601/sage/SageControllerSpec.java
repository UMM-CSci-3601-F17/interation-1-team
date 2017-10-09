package umm3601.sage;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

/**
 * JUnit tests for the UserController.
 *
 * Created by mcphee on 22/2/17.
 */
public class SageControllerSpec
{
    private SageController sageController;
    private ObjectId obstinateId;
    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection<Document> userDocuments = db.getCollection("sages");
        userDocuments.drop();
        List<Document> testSages = new ArrayList<>();
        testSages.add(Document.parse("{\n" +
            "                    word: \"Aesthetic reading\",\n" +
            "                    synonym: \"artistic\",\n" +
            "                    antonym: \"Efferant Reading\",\n" +
            "                    gensense: \"a term to describe reading for pleasure\"\n" +
            "                    example: \"A readers response that is driven by personal feelings from the transactionbetween the reader with text Louise Rosenblatt 1978 term\"\n" +
            "                }"));
        testSages.add(Document.parse("{\n" +
            "                    word: \"Alliteration\",\n" +
            "                    synonym: \"allegory\",\n" +
            "                    antonym: \"free verse poetry\",\n" +
            "                    gensense: \"repetition of the initial sound (s) or letters in a group of words.\"\n" +
            "                    example: \"Often found in prose or poetry: Craig loved his fuzzy furry ferret.\"\n" +
            "                }"));
        testSages.add(Document.parse("{\n" +
            "                    word: \"Automaticity\",\n" +
            "                    synonym: \"Fluency\",\n" +
            "                    antonym: \"difficult\",\n" +
            "                    gensense: \"rapid and fluent recognition of words requiring only a minumm of effort and attention\"\n" +
            "                    example: \"Automatic processing of information from text including comprehension, decoding words and other tasks\"\n" +
            "                }"));

        obstinateId = new ObjectId();
        BasicDBObject sam = new BasicDBObject("_id", obstinateId);
        sam = sam.append("word", "Obstinate")
            .append("synonym", "Cantankerous")
            .append("antonym", "flexible")
            .append("gensense", "stubbornly refusing to change one's opinion or chosen course of action, despite attempts to persuade one to do so")
            .append("example", "the obstinate problem of unemployment");



        userDocuments.insertMany(testSages);
        userDocuments.insertOne(Document.parse(sam.toJson()));

        // It might be important to construct this _after_ the DB is set up
        // in case there are bits in the constructor that care about the state
        // of the database.
        sageController = new SageController(db);
    }

    // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    private static String getWord(BsonValue val) {
        BsonDocument doc = val.asDocument();
        return ((BsonString) doc.get("word")).getValue();
    }

    @Test
    public void getAllSages() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = sageController.getSages(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = docs
            .stream()
            .map(SageControllerSpec::getWord)
            .sorted()
            .collect(Collectors.toList());
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Alliteration", "Automaticity", "Obstinate");
        assertEquals("Cards should match", expectedWords, words);
    }

    @Test
    public void getObstinateById() {
        String jsonResult = sageController.getSage(obstinateId.toHexString());
        Document sam = Document.parse(jsonResult);
        assertEquals("Word should match", "Obstinate", sam.get("word"));
    }
}
